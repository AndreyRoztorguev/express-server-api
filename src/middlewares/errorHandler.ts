import { Request, Response } from "express";
import { HttpError } from "http-errors";

const errorHandler = (err: HttpError, req: Request, res: Response): void => {
  //   console.error(err); // Log the error details (for debugging purposes)
  res.status(err.statusCode).json({
    success: false,
    message: err.message || "Something went wrong!",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorHandler;
