-- CreateEnum
CREATE TYPE "IdentityProvider" AS ENUM ('RESTRICTIFY', 'GOOGLE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "usename" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "identityProvider" "IdentityProvider" NOT NULL DEFAULT 'RESTRICTIFY',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_usename_key" ON "User"("usename");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
