/*
  Warnings:

  - You are about to drop the column `cartItemId` on the `OrderItems` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderItems" DROP CONSTRAINT "OrderItems_cartItemId_fkey";

-- DropIndex
DROP INDEX "OrderItems_cartItemId_key";

-- AlterTable
ALTER TABLE "OrderItems" DROP COLUMN "cartItemId",
ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;
