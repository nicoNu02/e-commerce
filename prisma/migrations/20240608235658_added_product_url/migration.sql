/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "url" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Product_url_key" ON "Product"("url");
