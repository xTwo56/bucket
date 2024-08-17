"use server"

import { NextResponse } from "next/server"
import { ProductType } from "../types"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export async function addProduct({ name, description, price, quantity, sellerId }: ProductType) {

  console.log("inside addProduct")
  const newProduct = await prisma.product.create({
    data: {
      name,
      description,
      price,
      quantity,
      seller: {
        connect: {
          id: sellerId
        }
      }
    }
  })
  if (!newProduct) return NextResponse.json({
    msg: "null"
  })

  console.log("from actions: " + newProduct)
  return newProduct;
}
