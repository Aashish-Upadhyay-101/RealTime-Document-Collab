import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/prisma";

export const createDoc = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { title, content } = req.body;

    if (!title) title = "Untitled";

    if (!content) content = "";

    console.log(title, content, req.user);

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
          Collaborator: {
            create: {
              userId: req.user?.id!,
              permission: "EDIT",
            },
          },
        },
        include: {
          Collaborator: true,
        },
      })
      .catch((err) => {
        console.log(err.message);
        next(err);
      });

    res.status(201).json({
      message: "docs created",
      document,
    });
  } catch (err: any) {
    res.json({
      message: "failed",
      error: err.message,
    });
  }
};
