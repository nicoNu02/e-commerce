/*
  Warnings:

  - You are about to drop the column `product_id` on the `Color` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Color" DROP CONSTRAINT "Color_product_id_fkey";

-- AlterTable
ALTER TABLE "Color" DROP COLUMN "product_id";

-- CreateTable
CREATE TABLE "ColorProduct" (
    "code" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ColorProduct_pkey" PRIMARY KEY ("code","productId")
);

-- AddForeignKey
ALTER TABLE "ColorProduct" ADD CONSTRAINT "ColorProduct_code_fkey" FOREIGN KEY ("code") REFERENCES "Color"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ColorProduct" ADD CONSTRAINT "ColorProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
