"use server"

import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "@/lib/auth"
import { ProductType } from "@/actions/product/types"
const prisma = new PrismaClient()

export async function addToCart({ id, name, price, quantity }: ProductType) {

  if (!id || !name || !price || !quantity) {
    console.log("product: " + { id, name, price, quantity })
    console.log("product not completely defined")
    return {
      msg: "product not completely defined"
    }
  }

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
        productId: id,
        price
      }
    })
    return {
      success: true,
      msg: "item added successfully"
    };
  }

  console.log("existingCartId: " + existingCart.id)
  console.log("productPrice: " + price)
  const existingItem = await prisma.cartItems.findMany({
    where: {
      cartId: existingCart.id,
      productId: id,
    }
  })

  if (!existingItem[0]) {
    console.log("inside existingItem")
    const newCartItem = await prisma.cartItems.create({
      data: {
        cartId: existingCart.id,
        productId: id,
        price
      }
    })

    return {
      success: true,
      msg: "item added successfully"
    };
  }

  console.log("productquantity: " + quantity)
  console.log("itemquantity: " + existingItem[0].quantity)

  if (existingItem[0].quantity < quantity) {
    console.log("increasing count")
    console.log("existingItem: " + JSON.stringify(existingItem[0]))
    console.log("existingItem.price: " + existingItem[0].price)

    const increasedCountItem = await prisma.cartItems.update({
      where: {
        id: existingItem[0].id,
      },
      data: {
        quantity: {
          increment: 1
        },
        price: existingItem[0].price + price
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
