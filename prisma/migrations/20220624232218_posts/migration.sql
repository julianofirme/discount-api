-- CreateTable
CREATE TABLE "Post" (
    "uuid" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "author_name" TEXT NOT NULL,
    "media_url" TEXT,
    "likes" INTEGER NOT NULL,
    "company_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_company_uuid_fkey" FOREIGN KEY ("company_uuid") REFERENCES "Company"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
