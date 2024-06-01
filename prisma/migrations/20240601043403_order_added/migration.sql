-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dni" TEXT;

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "addres_line" TEXT NOT NULL,
    "house_number" TEXT NOT NULL,
    "flor" TEXT,
    "apartment" TEXT,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "shipping_method" TEXT NOT NULL,
    "shipping_details" TEXT,
    "shipping_price" INTEGER,
    "payment_method" TEXT NOT NULL,
    "total_price" INTEGER NOT NULL,
    "notes" TEXT,
    "stage" TEXT DEFAULT 'In process',
    "paid" BOOLEAN DEFAULT false,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
