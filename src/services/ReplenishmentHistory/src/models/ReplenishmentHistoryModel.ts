import mongoose from "mongoose";
import "./InventoryModel";
import "./SupplierBranchModel";
import "./OrganizationModel";

const InventoryDetails = new mongoose.Schema({
  inventoryId: {
    type: Number,
    default: null
  },
  inventoryUuid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Invetory",
    default: null,
  }
}, {
  _id: false
});

const SupplierBranchDetails = new mongoose.Schema({
  supplierBranchId: {
    type: Number,
    default: null
  },
  supplierBranchUuid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SupplierBranch",
    default: null
  }
},{
  _id: false
});

const OrganizationDetails = new mongoose.Schema({
  organizationId: {
    type: Number,
    default: null
  },
  organizationUuid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    default: null,
  }
}, {
  _id: false // Configura _id como false para el esquema OrganizationDetails
});

const ReplenishmentHistorySchema = new mongoose.Schema(
  {
    Id: {
      type: Number,
      unique: true,
    },
    date: {
      type: String,
      default: new Date().toISOString(),
    },
    expirationDate: {
      type: String,
      default: new Date().toISOString(),
    },
    quantity: {
      type: Number,
      required: [true, "El campo 'quantity' es requerido"]
    },
    cost: {
      type: Number,
      required: [true, "El campo 'cost' es requerido"]
    },
    documentUrl: {
      type: String
    },
    documentNumber: {
      type: String
    },
    syncStatus: {
      type: Number,
      required: [true, "El campo 'syncStatus' es requerido"],
    },
    inventory: {
      type: InventoryDetails,
    },
    supplierbranch: {
      type: SupplierBranchDetails
    },
    organization: {
      type: OrganizationDetails
    }
  },
  {
    timestamps: true,
  }
);


const ReplenishmentHistory = mongoose.model("ReplenishmentHistory", ReplenishmentHistorySchema);
export default ReplenishmentHistory;
