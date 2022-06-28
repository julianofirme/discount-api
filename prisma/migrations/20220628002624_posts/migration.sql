-- CreateTable
CREATE TABLE "PostLikes" (
    "uuid" TEXT NOT NULL,
    "customer_uuid" TEXT NOT NULL,
    "post_uuid" TEXT NOT NULL,

    CONSTRAINT "PostLikes_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "PostLikes" ADD CONSTRAINT "PostLikes_customer_uuid_fkey" FOREIGN KEY ("customer_uuid") REFERENCES "Customer"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLikes" ADD CONSTRAINT "PostLikes_post_uuid_fkey" FOREIGN KEY ("post_uuid") REFERENCES "Post"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
