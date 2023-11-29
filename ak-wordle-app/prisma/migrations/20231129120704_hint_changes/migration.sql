/*
  Warnings:

  - You are about to drop the column `allegiance` on the `Operator` table. All the data in the column will be lost.
  - You are about to drop the column `cost` on the `Operator` table. All the data in the column will be lost.
  - You are about to alter the column `rarity` on the `Operator` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `date` to the `ChosenOperators` table without a default value. This is not possible if the table is not empty.
  - Added the required column `archetype` to the `Operator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `costE1` to the `Operator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `costE2` to the `Operator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nation` to the `Operator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Operator` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ChosenOperators" (
    "gameId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "operatorId" TEXT NOT NULL,
    "timesGuessed" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "ChosenOperators_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "Operator" ("charId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ChosenOperators" ("gameId", "operatorId", "timesGuessed") SELECT "gameId", "operatorId", "timesGuessed" FROM "ChosenOperators";
DROP TABLE "ChosenOperators";
ALTER TABLE "new_ChosenOperators" RENAME TO "ChosenOperators";
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
    "costE1" INTEGER NOT NULL,
    "costE2" INTEGER NOT NULL
);
INSERT INTO "new_Operator" ("charId", "gender", "infected", "name", "profession", "race", "rarity") SELECT "charId", "gender", "infected", "name", "profession", "race", "rarity" FROM "Operator";
DROP TABLE "Operator";
ALTER TABLE "new_Operator" RENAME TO "Operator";
CREATE UNIQUE INDEX "Operator_name_key" ON "Operator"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
