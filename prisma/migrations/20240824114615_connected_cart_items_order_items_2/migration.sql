-- DropForeignKey
ALTER TABLE "OrderItems" DROP CONSTRAINT "OrderItems_cartItemId_fkey";

-- AlterTable
ALTER TABLE "OrderItems" ALTER COLUMN "cartItemId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_cartItemId_fkey" FOREIGN KEY ("cartItemId") REFERENCES "CartItems"("id") ON DELETE SET NULL ON UPDATE CASCADE;
