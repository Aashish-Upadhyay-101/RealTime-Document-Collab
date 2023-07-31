import { NextFunction, Request, Response } from "express";
import validator from "validator";
import { BadRequestError } from "../../common/errors/bad-request-error";
import { checkIfUserExists } from "../../prisma/helper/auth";
import prisma from "../../prisma/prisma";
import { Token } from "../utils/jwt";
import { setAuthCookie } from "../utils/cookie";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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

    if (password?.length < 8) {
      return next(
        new BadRequestError("Password must be at least 8 characters long")
      );
    }

    if (!password && passwordConfirm) {
      return next(new BadRequestError("Password must be provided."));
    }

    if (password !== passwordConfirm) {
      return next(
        new BadRequestError("Password and Confirm Password do not match.")
      );
    }

    // check if user already exists
    if (await checkIfUserExists(username)) {
      return next(
        new BadRequestError("User with that username already exits.")
      );
    }

    console.log(await checkIfUserExists(username));
    console.log(await checkIfUserExists(email));

    if (await checkIfUserExists(email)) {
      return next(new BadRequestError("User with that email already exits."));
    }

    // create the user and save to database
    const user = await prisma.user.create({
      data: {
        username,
        email,
        firstName,
        lastName,
        password,
      },
    });

    // generate jwt
    const token = Token.generateAuthToken(user.id);

    // save generated refresh token to the database
    const refreshToken = token.refresh;
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
      },
    });

    setAuthCookie(res, token);

    // TODO: using kafka, send email verification mail
    // send verification mail
    // verify the new user

    // send created response
    res.status(201).json({
      message: "signup successful",
      token,
    });
  } catch (err: any) {
    res.json({
      message: "failed",
      error: err.message,
    });
  }
};
