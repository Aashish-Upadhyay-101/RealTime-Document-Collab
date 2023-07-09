import { Response } from "express";

interface IToken {
  access: string;
  refresh: string;
}

export const setAuthCookie = (res: Response, token: IToken) => {
  res.cookie("auth_token", token, {
    expires: new Date(
      Date.now() + 1000 * 60 * 60 * 24 * Number(process.env.COOKIE_EXPIRES_IN)
    ),
    httpOnly: true,
  });
};
