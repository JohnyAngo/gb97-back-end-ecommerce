import EnterpriseUser from "../../../../../models/UserModel";
import connectDatabase from "../../../../../database/mongodb";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

export const main = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const acceptLanguage =
    event.headers["Accept-Language"] ||
    event.headers["accept-language"] ||
    "en";

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Content-Type, User-Agent, Authorization, X-Requested-With",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
  };

  try {
    if (event.httpMethod === "OPTIONS") {
      console.log("OPTIONS Test");
      return {
        statusCode: 200,
        headers,
        body: "",
      };
    }

    await connectDatabase();

    const { userName, password } = JSON.parse(event.body);
    const userExist = await EnterpriseUser.findOne({ userName: userName });
    if (!userExist) {
      let messageError: string;
      if (acceptLanguage === "es") {
        messageError = "Credenciales incorrectas.";
      } else {
        messageError = "Incorrect credentials.";
      }
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          response: false,
          message: messageError,
          serverMessage: null,
          data: null,
        }),
      };
    }
    // Verifica si la contraseña ingresada es correcta
    const isPasswordMatched = await bcrypt.compare(
      password,
      userExist.password
    );

    if (!isPasswordMatched) {
      let messageError: string;
      if (acceptLanguage === "es") {
        messageError = "Credenciales incorrectas.";
      } else {
        messageError = "Incorrect credentials.";
      }
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          response: false,
          message: messageError,
          serverMessage: null,
          data: null,
        }),
      };
    }

    const token = jwt.sign(
      { id: userExist.userName },
      "dxfghjbvfcdgfchjlnhvgfdxfhgjhjbhvgcfhgvhjbhvgcfxvf5e4678765453etrftty",
      {
        expiresIn: "1d",
      }
    );

    let loginMessage: string;
    if (acceptLanguage === "es") {
      loginMessage = "Login Exitoso.";
    } else {
      loginMessage = "Successful Login.";
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        response: true,
        message: loginMessage,
        serverMessage: null,
        data: {
          userId: userExist._id,
          userName: userExist.userName,
          token: token,
          personId: userExist.personId,
          organizationId: userExist.organizationId,
          rol: userExist?.rol,
        },
      }),
    };
  } catch (err) {
    let loginError: string;
    if (acceptLanguage === "es") {
      loginError = "Error al loguearse.";
    } else {
      loginError = "Failed to login.";
    }
    return {
      statusCode: err.statusCode || 500,
      headers,
      body: JSON.stringify({
        response: false,
        message: "Error al loguearse",
        serverMessage: err.message,
        data: null,
      }),
    };
  }
};
