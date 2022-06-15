-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Product" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "logo" TEXT,
    "company_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_company_uuid_fkey" FOREIGN KEY ("company_uuid") REFERENCES "Company"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
