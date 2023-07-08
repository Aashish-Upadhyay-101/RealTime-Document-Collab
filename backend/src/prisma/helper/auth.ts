import prisma from "../prisma";
import { Password } from "./password";

export const checkIfUserExists = async (
  identifier: string
): Promise<boolean> => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        {
          username: identifier,
        },
        {
          email: identifier,
        },
      ],
    },
  });

  if (user) {
    return true;
  }

  return false;
};

// password hashing
prisma.$use(async (params, next) => {
  if (params.model === "User") {
    if (params.action === "create" || params.action === "update") {
      const user = params.args.data;
      if (user.password) {
        const getHashedPassword = await Password.hashPassword(user.password);
        user.password = getHashedPassword;
      }
    }
  }
  return next(params);
});
