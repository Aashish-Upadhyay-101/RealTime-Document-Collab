import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../../common/errors/bad-request-error";
import { checkIfUserExists } from "../../prisma/helper/auth";

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email) {
    return next(new BadRequestError("Email must be provided"));
  }

  if (!password) {
    return next(new BadRequestError("Password must be provided"));
  }

  if (!checkIfUserExists(email)) {
    return next(
      new BadRequestError("Email doesn't exist, please signup first")
    );
  }

  // log user in
  // generate jwt token
  // set to response cookie
  // send json response
};
