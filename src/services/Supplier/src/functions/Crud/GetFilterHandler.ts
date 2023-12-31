import Supplier from "../../models/SupplierModel";
import connectDatabase from "../../../../../database/mongodb";
import customMessage from "../../../../../helpers/customMessage";
import responseHeaders from "../../../../../helpers/responseHeaders";
import { applyPaginationEmb } from "../../../../../helpers/paginationEmb";
import { authMiddleware } from "../../../../../middleware/authentication";
import Organization from "../../models/OrganizationModel";
import Item from "../../models/ItemModel";
import InventoryRegistration from "../../models/InventoryRegistrationModel";

export const main = authMiddleware( async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const acceptLanguage =
    event.headers["Accept-Language"] ||
    event.headers["accept-language"] ||
    "es";
  const filtros = JSON.parse(event.body) || {};
  const filtrosValidos = Object.entries(filtros).filter(
    ([, value]) => value !== undefined && value !== null && value !== ""
  );

  let query = {};
  const pipeline: any[] = [];

  const referenceKeys = [
    "organization.organizationUuid",
  ];

  const referenceMaps = {
    "organization.organizationUuid": {
      model: Organization,
    },
  }

  for (const referenceKey of referenceKeys) {
    const reference = referenceMaps[referenceKey];
    const RefModel = reference.model;

    pipeline.push({
      $lookup: {
        from: RefModel.collection.name,
        localField: referenceKey,
        foreignField: "_id",
        as: referenceKey,
      },
    });

    pipeline.push({
      $unwind: `$${referenceKey}`,
    });
  }

  for (const [key, value] of filtrosValidos) {
    if (referenceKeys.includes(key.split(".")[0])) {
      const filterKey = `${key}`;
      const regexFilter =
        typeof value === "string"
          ? { $regex: new RegExp(value.toLowerCase(), "i") }
          : value;
      pipeline.push({ $match: { [filterKey]: regexFilter } });
    } else {
      query[key] =
        typeof value === "string"
          ? { $regex: new RegExp(value.toLowerCase(), "i") }
          : value;
    }
  }

  pipeline.push({ $match: query });
  try {
    await connectDatabase();
    const { data, pagination } = await applyPaginationEmb(
      Supplier,
      event,
      pipeline
    );
    if (data.length === 0) {
      return {
        statusCode: 400,
        headers: responseHeaders,
        body: JSON.stringify({
          response: false,
          message: "No existen registros.",
          data: null,
        }),
      };
    }

    const newData = await Promise.all(data.map(async item => {
      const items = await Item.find({"supplier.supplierUuid": item._id})
      const orders = await InventoryRegistration.find({"supplier.supplierUuid": item._id})
      return {
        ...item,
        items,
        orders
      }
    }));
    const message = customMessage(newData, "ga", acceptLanguage);
    const body = { ...message, pagination };

    return {
      statusCode: 200,
      headers: responseHeaders,
      body: JSON.stringify(body),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: responseHeaders,
      body: JSON.stringify({ status: false, error: err.message }),
    };
  }
});
