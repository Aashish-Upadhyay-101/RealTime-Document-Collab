import { Request, Response } from "express";

export const getMe = (req: Request, res: Response) => {
  res.send({
    me: req.user,
  });
};
