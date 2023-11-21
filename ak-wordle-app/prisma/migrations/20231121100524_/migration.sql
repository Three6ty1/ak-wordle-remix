/*
  Warnings:

  - You are about to alter the column `rarity` on the `Operator` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Operator" (
    "charId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "allegiance" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "rarity" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "infected" TEXT NOT NULL
);
INSERT INTO "new_Operator" ("allegiance", "charId", "cost", "gender", "infected", "name", "profession", "race", "rarity") SELECT "allegiance", "charId", "cost", "gender", "infected", "name", "profession", "race", "rarity" FROM "Operator";
DROP TABLE "Operator";
ALTER TABLE "new_Operator" RENAME TO "Operator";
CREATE UNIQUE INDEX "Operator_name_key" ON "Operator"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
