import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import { logger } from "../lib/winston";

// parameter next is required
const errorHandler = (err: HttpError, req: Request, res: Response, _next: NextFunction): void => {
  logger.error(`Error: ${err.message}\nStack: ${err.stack}`);
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorHandler;
