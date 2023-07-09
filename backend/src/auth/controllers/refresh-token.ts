import { NextFunction, Request, Response } from "express";
import { NotAuthorized } from "../../common/errors/not-authorized";
import prisma from "../../prisma/prisma";
import { Forbidden } from "../../common/errors/forbidden";
import { Token } from "../utils/jwt";

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.header("x-refresh-token");

  if (!refreshToken) {
    return next(new NotAuthorized("Refresh token not found"));
  }

  const token = await prisma.refreshToken.findFirst({
    where: {
      token: refreshToken,
    },
  });

  if (!token) {
    return next(new Forbidden("Invalid refresh token"));
  }

  const accessToken = Token.generateNewAccessTokenWithRefreshToken(token.token);
  const newTokenPair = {
    access: accessToken,
    refresh: refreshToken,
  };

  res.cookie("auth_token", newTokenPair, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    httpOnly: true,
  });

  res.status(201).json({
    access: accessToken,
  });
};
