/*
  Warnings:

  - You are about to drop the column `cityId` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the `cities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `states` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_cityId_fkey";

-- DropForeignKey
ALTER TABLE "cities" DROP CONSTRAINT "cities_stateId_fkey";

-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "cityId",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;

-- DropTable
DROP TABLE "cities";

-- DropTable
DROP TABLE "states";
