import restrictifyPrisma from "../prisma";

export const checkIfUserExists = async (
  identifier: string
): Promise<boolean> => {
  const user = await restrictifyPrisma.user.findFirst({
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
