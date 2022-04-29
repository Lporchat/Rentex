import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import "express-async-errors";
import "reflect-metadata";
import swaggerUI from "swagger-ui-express";
import morgan from "morgan";
import { router } from "./routes";
import swaggerFile from "../../../swagger.json";
import createConnection from "../typeorm";

import "../../container";
import { AppError } from "../../errors/AppError";
import upload from "../../../config/upload";

createConnection();
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(500).json({
    status: "Error",
    message: `Internal Server Error: ${err.message}`,
  });
});

export { app };
