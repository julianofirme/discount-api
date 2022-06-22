/*
  Warnings:

  - Added the required column `type` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('COMPANY', 'CUSTOMER');

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "type" "Type" NOT NULL;
