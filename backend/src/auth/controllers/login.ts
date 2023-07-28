import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../../common/errors/bad-request-error";
import { checkIfUserExists } from "../../prisma/helper/auth";
import { Token } from "../utils/jwt";
import prisma from "../../prisma/prisma";
import { setAuthCookie } from "../utils/cookie";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return next(new BadRequestError("User doesn't exist, please signup first"));
  }

  const token = Token.generateAuthToken(user?.id as string);
  const refreshToken = token.refresh;
  await prisma.refreshToken.update({
    where: {
      userId: user?.id as string,
    },
    data: {
      token: refreshToken,
    },
  });

  setAuthCookie(res, token);

  res.status(200).json({
    message: "login successful",
    token,
  });
};
