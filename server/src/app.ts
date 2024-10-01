import "dotenv/config";

import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

import { router } from "./routes";

import { corsOptions } from "./utils/cors.handle";

const app = express();

app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);

export default app;