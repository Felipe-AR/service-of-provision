/*
  Warnings:

  - Added the required column `cpf` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rg` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "rg" TEXT NOT NULL;
