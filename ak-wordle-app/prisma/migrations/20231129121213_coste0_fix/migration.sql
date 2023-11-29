/*
  Warnings:

  - You are about to drop the column `costE1` on the `Operator` table. All the data in the column will be lost.
  - Added the required column `costE0` to the `Operator` table without a default value. This is not possible if the table is not empty.

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
    "archetype" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "infected" TEXT NOT NULL,
    "rarity" INTEGER NOT NULL,
    "costE0" INTEGER NOT NULL,
    "costE2" INTEGER NOT NULL
);
INSERT INTO "new_Operator" ("archetype", "charId", "costE2", "gender", "group", "infected", "name", "nation", "position", "profession", "race", "rarity") SELECT "archetype", "charId", "costE2", "gender", "group", "infected", "name", "nation", "position", "profession", "race", "rarity" FROM "Operator";
DROP TABLE "Operator";
ALTER TABLE "new_Operator" RENAME TO "Operator";
CREATE UNIQUE INDEX "Operator_name_key" ON "Operator"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
