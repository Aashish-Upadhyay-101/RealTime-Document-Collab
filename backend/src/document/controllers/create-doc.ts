import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/prisma";

export const createDoc = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { title, content } = req.body;

  if (!title) title = "Untitled";

  if (!content) content = "";

  const document = await prisma.document
    .create({
      data: {
        title,
        content,
        user: {
          connect: {
            id: "b84233dc-487c-46e9-b250-a3b7e4f5326f",
            // id: req.user?.id,
          },
        },
        Collaborator: {
          create: {
            userId: "b84233dc-487c-46e9-b250-a3b7e4f5326f",
            // userId: req.user?.id as string,
          },
        },
      },
      include: {
        Collaborator: true,
      },
    })
    .catch((err) => next(err));

  res.status(201).json({
    message: "docs created",
    document,
  });
};
