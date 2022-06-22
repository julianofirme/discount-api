-- CreateTable
CREATE TABLE "Customer" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "type" "Type" NOT NULL,
    "profile_pic" TEXT,
    "recovery_code" TEXT,
    "recovery_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "zipcode" TEXT,
    "state" TEXT,
    "city" TEXT,
    "street" TEXT,
    "number" TEXT,
    "district" TEXT,
    "complement" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_document_key" ON "Customer"("document");
