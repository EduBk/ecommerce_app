//! IMPORTACION DE VARIABLES DE ENTORNO
import "dotenv/config";

const base_url = process.env.BASE_URL as string;
const whiteList = [base_url, "http://localhost:3000"];

const corsOptions = {
  origin: function (origin: any, callback: any) {
    let corsPass = true;
    if (whiteList.indexOf(origin) !== -1) {
      corsPass = true;
    } else {
      corsPass = false;
    }
    callback(null, corsPass);
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export { corsOptions };