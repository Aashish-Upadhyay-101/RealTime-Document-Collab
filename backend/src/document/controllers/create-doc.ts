import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/prisma";
import { create } from "domain";

export const createDoc = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, content } = req.body;

  const document = await prisma.document
    .create({
      data: {
        title,
        content,
        user: {
          connect: {
            id: req.user?.id,
          },
        },
      },
    })
    .catch((err) => next(err));

  res.status(201).json({
    message: "docs created",
    document,
  });
};
