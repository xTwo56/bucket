"use server"

import { CartItemType } from "@/app/(ops)/user/cart/types"
import { NEXT_AUTH } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"
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
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      confirmed: true,
      returned: false
    }))

    const orderItems = await prisma.orderItems.createMany({
      data: orderItemData
    })

    const updatePromises = cartItems.map((item: CartItemType) => {
      let itemQuantity = item.quantity
      let productQuantity = item.product?.quantity
      if (!productQuantity) {
        console.log("no products left")
        return {
          msg: "no products left"
        }
      }

      return prisma.product.update({
        where: {
          id: item.productId
        },
        data: {
          quantity: productQuantity - itemQuantity
        }
      })
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

