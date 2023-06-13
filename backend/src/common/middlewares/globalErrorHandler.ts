import { Request, Response, NextFunction } from "express";
import BaseError from "../errors/BaseError";

const globalErrorHandler = (
  err: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.url.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
      stack: err.stack,
    });
  }
};

export default globalErrorHandler;
