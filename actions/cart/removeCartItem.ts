"use server"

import { CartItemType } from "@/app/(ops)/user/cart/types"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export async function removeCartItem(itemId: any) {

  await prisma.cartItems.delete({
    where: {
      id: itemId
    }
  })
}
