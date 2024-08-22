"use server"

import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "@/lib/auth"
import { NextResponse } from "next/server"
const prisma = new PrismaClient()

export async function addToCart(productId: string, productQuantity: number, productPrice: number) {

  const response = await getServerSession(NEXT_AUTH)
  const userId = response.user.userId
  console.log("response: " + JSON.stringify(response))
  console.log("userId: " + userId)

  const existingCart = await prisma.cart.findUnique({
    where: {
      userId
    }
  })

  if (!existingCart) {
    console.log("inside !existingCart")
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

    return {
      success: true,
      msg: "item added successfully"
    };
  }

  console.log("existingCartId: " + existingCart.id)
  const existingItem = await prisma.cartItems.findMany({
    where: {
      cartId: existingCart.id,
      productId
    }
  })

  if (!existingItem[0]) {
    console.log("inside existingItem")
    const newCartItem = await prisma.cartItems.create({
      data: {
        cartId: existingCart.id,
        productId,
        price: productPrice
      }
    })

    return {
      success: true,
      msg: "item added successfully"
    };
  }

  console.log("productquantity: " + productQuantity)
  console.log("itemquantity: " + existingItem[0].quantity)

  if (existingItem[0].quantity < productQuantity) {
    console.log("increasing count")

    const increasedCountItem = await prisma.cartItems.update({
      where: {
        id: existingItem[0].id,
        productId
      },
      data: {
        quantity: {
          increment: 1
        },
        price: existingItem[0].price * 2
      }
    })
    return {
      success: true,
      msg: "item added successfully"
    }
  }

  return {
    success: false,
    msg: "can't add more"
  }
}
