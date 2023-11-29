/*
  Warnings:

  - You are about to drop the column `allegiance` on the `Operator` table. All the data in the column will be lost.
  - Added the required column `nation` to the `Operator` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Operator" (
    "charId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "group" TEXT,
    "nation" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "infected" TEXT NOT NULL,
    "rarity" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL
);
INSERT INTO "new_Operator" ("charId", "cost", "gender", "infected", "name", "profession", "race", "rarity") SELECT "charId", "cost", "gender", "infected", "name", "profession", "race", "rarity" FROM "Operator";
DROP TABLE "Operator";
ALTER TABLE "new_Operator" RENAME TO "Operator";
CREATE UNIQUE INDEX "Operator_name_key" ON "Operator"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
