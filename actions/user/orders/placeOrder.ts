"use server"

import { CartItemType } from "@/app/(ops)/user/cart/types"
import { NEXT_AUTH } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"
import { connect } from "http2"
import { getServerSession } from "next-auth"
const prisma = new PrismaClient()

export async function placeOrder(cartItems: any) {

  const session = await getServerSession(NEXT_AUTH)
  const userId = session?.user?.userId

  await prisma.$transaction(async (prisma) => {

    const order = await prisma.order.create({
      data: {
        status: "Pending",
        user: {
          connect: {
            id: userId
          }
        }
      }
    })

    const orderItemData = cartItems.map((item: CartItemType) => ({
      userId,
      productId: item.productId,
      confirmed: true,
      returned: false
    }))

    const orderItems = await prisma.orderItems.createMany({
      data: orderItemData
    })

    await prisma.cartItems.deleteMany({
      where: {
        cart: {
          userId
        }
      }
    })

    await prisma.cart.deleteMany({
      where: {
        userId
      }
    })

    return order
  })
}

