-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ChosenOperators" (
    "gameID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" INTEGER NOT NULL,
    "operatorId" TEXT NOT NULL,
    "timesGuessed" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "ChosenOperators_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "Operator" ("charId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ChosenOperators" ("date", "gameID", "operatorId", "timesGuessed") SELECT "date", "gameID", "operatorId", "timesGuessed" FROM "ChosenOperators";
DROP TABLE "ChosenOperators";
ALTER TABLE "new_ChosenOperators" RENAME TO "ChosenOperators";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
