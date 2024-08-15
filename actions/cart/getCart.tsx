"use server"

import { NEXT_AUTH } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
const prisma = new PrismaClient()

export async function getCart() {

  const response = await getServerSession(NEXT_AUTH)
  const userId = response.user.userId
  const carts = await prisma.cart.findMany({
    where: {
      userId
    },
    include: {
      product: true
    }
  })
  console.log("carts: " + JSON.stringify(carts))
  return carts


}
