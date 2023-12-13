/*
  Warnings:

  - You are about to drop the `DemoProject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DemoUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DemoProject";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DemoUser";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Operator" (
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

-- CreateTable
CREATE TABLE "ChosenOperators" (
    "gameId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "operatorId" TEXT NOT NULL,
    "timesGuessed" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "ChosenOperators_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "Operator" ("charId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Operator_name_key" ON "Operator"("name");
