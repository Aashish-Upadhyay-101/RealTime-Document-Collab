import { NextFunction, Request, Response } from "express";
import validator from "validator";
import { BadRequestError } from "../../common/errors/bad-request-error";

export const signup = (req: Request, res: Response, next: NextFunction) => {
  const { username, firstName, lastName, email, password, passwordConfirm } =
    req.body;

  // validate input
  if (!username) {
    return next(new BadRequestError("Username must be provided."));
  }

  if (!firstName && !lastName) {
    return next(
      new BadRequestError("First name and last name must be provided.")
    );
  }

  if (!email) {
    return next(new BadRequestError("Email must be provided."));
  }

  if (!validator.isEmail(email)) {
    return next(new BadRequestError("Email is not valid."));
  }

  if (!password && passwordConfirm) {
    return next(new BadRequestError("Password must be provided."));
  }

  if (validator.equals(password, passwordConfirm)) {
    return next(
      new BadRequestError("Password and Confirm Password do not match.")
    );
  }

  // check if user already exists

  // hash password using best hashing algorithm

  // create the user and save to database

  // TODO: using kafka, send email verification mail
  // send verification mail

  // verify the new user

  // send created response
};
