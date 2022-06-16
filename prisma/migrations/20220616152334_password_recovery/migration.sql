-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "recovery_code" TEXT,
ADD COLUMN     "recovery_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
