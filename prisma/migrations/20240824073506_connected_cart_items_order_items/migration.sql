/*
  Warnings:

  - You are about to drop the `_OrderToOrderItems` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cartItemId]` on the table `OrderItems` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cartItemId` to the `OrderItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `OrderItems` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_OrderToOrderItems" DROP CONSTRAINT "_OrderToOrderItems_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToOrderItems" DROP CONSTRAINT "_OrderToOrderItems_B_fkey";

-- DropIndex
DROP INDEX "OrderItems_userId_key";

-- AlterTable
ALTER TABLE "OrderItems" ADD COLUMN     "cartItemId" TEXT NOT NULL,
ADD COLUMN     "orderId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_OrderToOrderItems";

-- CreateIndex
CREATE UNIQUE INDEX "OrderItems_cartItemId_key" ON "OrderItems"("cartItemId");

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_cartItemId_fkey" FOREIGN KEY ("cartItemId") REFERENCES "CartItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
