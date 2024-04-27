/*
  Warnings:

  - Changed the type of `expMonth` on the `Card` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `expYear` on the `Card` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "expMonth",
ADD COLUMN     "expMonth" INTEGER NOT NULL,
DROP COLUMN "expYear",
ADD COLUMN     "expYear" INTEGER NOT NULL;
