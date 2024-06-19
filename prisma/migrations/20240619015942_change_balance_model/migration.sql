/*
  Warnings:

  - You are about to drop the column `description` on the `Balance` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Balance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Balance" DROP COLUMN "description",
DROP COLUMN "name";
