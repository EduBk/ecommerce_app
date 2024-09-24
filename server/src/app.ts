import "dotenv/config";

import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./routes";
import morgan from "morgan";

import { corsOptions } from "./utils/cors.handle";

const app = express();

app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

export default app;