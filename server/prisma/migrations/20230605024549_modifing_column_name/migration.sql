/*
  Warnings:

  - You are about to drop the column `cep` on the `addresses` table. All the data in the column will be lost.
  - Added the required column `zipCode` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "cep",
ADD COLUMN     "zipCode" TEXT NOT NULL;
