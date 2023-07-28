-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RefreshToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_RefreshToken" ("createdAt", "id", "token", "updatedAt", "userId") SELECT "createdAt", "id", "token", "updatedAt", "userId" FROM "RefreshToken";
DROP TABLE "RefreshToken";
ALTER TABLE "new_RefreshToken" RENAME TO "RefreshToken";
CREATE UNIQUE INDEX "RefreshToken_token_key" ON "RefreshToken"("token");
CREATE UNIQUE INDEX "RefreshToken_userId_key" ON "RefreshToken"("userId");
CREATE TABLE "new_Collaborator" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "permission" TEXT DEFAULT 'EDIT',
    CONSTRAINT "Collaborator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Collaborator_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Collaborator" ("documentId", "id", "permission", "userId") SELECT "documentId", "id", "permission", "userId" FROM "Collaborator";
DROP TABLE "Collaborator";
ALTER TABLE "new_Collaborator" RENAME TO "Collaborator";
CREATE UNIQUE INDEX "Collaborator_userId_key" ON "Collaborator"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
