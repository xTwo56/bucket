/*
  Warnings:

  - The `price` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "CartItems" ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0;
