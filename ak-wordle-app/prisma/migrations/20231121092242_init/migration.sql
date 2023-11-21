-- CreateTable
CREATE TABLE "Operator" (
    "charId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "allegiance" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "infected" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ChosenOperators" (
    "gameId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "operatorId" TEXT NOT NULL,
    "timesGuessed" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "ChosenOperators_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "Operator" ("charId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Operator_name_key" ON "Operator"("name");
