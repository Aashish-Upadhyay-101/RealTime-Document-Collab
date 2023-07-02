import prisma from "../prisma";

export const checkIfUserExists = async (
  identifier: string
): Promise<boolean> => {
  const user = await prisma.user.findFirst({
    where: {
      usename: identifier,
      OR: {
        email: identifier,
      },
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
      console.log(params);
      console.log(params.args);
    }
  }
});
