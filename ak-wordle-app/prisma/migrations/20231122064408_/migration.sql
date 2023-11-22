/*
  Warnings:

  - The primary key for the `ChosenOperators` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `gameID` to the `ChosenOperators` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ChosenOperators" (
    "gameID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 0,
    "date" INTEGER NOT NULL,
    "operatorId" TEXT NOT NULL,
    "timesGuessed" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "ChosenOperators_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "Operator" ("charId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ChosenOperators" ("date", "operatorId", "timesGuessed") SELECT "date", "operatorId", "timesGuessed" FROM "ChosenOperators";
DROP TABLE "ChosenOperators";
ALTER TABLE "new_ChosenOperators" RENAME TO "ChosenOperators";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
