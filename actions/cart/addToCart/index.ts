"use server"

import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "@/lib/auth"
const prisma = new PrismaClient()

export async function addToCart(productId: string) {

  const response = await getServerSession(NEXT_AUTH)
  const userId = response.user.userId
  console.log("response: " + JSON.stringify(response))

  const existingCart = await prisma.cart.findUnique({
    where: {
      userId
    }
  })

  if (!existingCart) {
    const newCart = await prisma.cart.create({
      data: {
        userId,
      }
    })
    const cartItem = await prisma.cartItems.create({
      data: {
        cartId: newCart.id,
        productId
      }
    })
    return newCart
  }

  const cartItem = await prisma.cartItems.create({
    data: {
      cartId: existingCart.id,
      productId
    }
  })
  return cartItem
}
