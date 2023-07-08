import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../../common/errors/bad-request-error";

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email) {
    return next(new BadRequestError("Email must be provided"));
  }

  if (!password) {
    return next(new BadRequestError("Password must be provided"));
  }
};
