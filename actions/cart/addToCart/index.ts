"use server"

import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "@/lib/auth"
import { NextResponse } from "next/server"
const prisma = new PrismaClient()

export async function addToCart(productId: string, productQuantity: number) {

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

  const existingItem = await prisma.cartItems.findMany({
    where: {
      cartId: existingCart.id,
      productId
    }
  })

  if (!existingItem) {
    const newCartItem = await prisma.cartItems.create({
      data: {
        cartId: existingCart.id,
        productId
      }
    })
    return newCartItem
  }

  console.log("productquantity: " + productQuantity)
  console.log("itemquantity: " + existingItem[0].quantity)

  if (existingItem[0].quantity < productQuantity) {

    const increasedCountItem = await prisma.cartItems.update({
      where: {
        id: existingCart.id,
        productId
      },
      data: {
        quantity: {
          increment: 1
        }
      }
    })

    const decreasedCountProduct = await prisma.product.update({
      where: {
        id: productId
      },
      data: {
        quantity: {
          decrement: 1
        }
      }
    })
  }

  return NextResponse.json({
    msg: "no items left"
  })

}
