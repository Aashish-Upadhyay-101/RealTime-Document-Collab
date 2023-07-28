import { NextFunction, Request, Response } from "express";
import { NotAuthorized } from "../../common/errors/not-authorized";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../../prisma/prisma";
import { User } from "@prisma/client";

export const authProtected = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.auth_token) {
    token = req.cookies?.auth_token;
  }

  if (!token) {
    return next(new NotAuthorized("You are not logged in! Please log in."));
  }

  const decoded = jwt.verify(
    token,
    process.env.JWT_ACCESS_TOKEN_SECRET as string
  ) as JwtPayload;

  const { id } = decoded;

  const currentUser = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  req.user = currentUser as User;
  next();
};
