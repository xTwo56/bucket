/*
  Warnings:

  - You are about to drop the column `productId` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_productId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "productId";

-- CreateTable
CREATE TABLE "_OrderToOrderItems" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrderToOrderItems_AB_unique" ON "_OrderToOrderItems"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderToOrderItems_B_index" ON "_OrderToOrderItems"("B");

-- AddForeignKey
ALTER TABLE "_OrderToOrderItems" ADD CONSTRAINT "_OrderToOrderItems_A_fkey" FOREIGN KEY ("A") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToOrderItems" ADD CONSTRAINT "_OrderToOrderItems_B_fkey" FOREIGN KEY ("B") REFERENCES "OrderItems"("id") ON DELETE CASCADE ON UPDATE CASCADE;
