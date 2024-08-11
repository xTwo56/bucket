"use server"

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export async function addSeller({ phone, userId }: any) {
  const newSeller = await prisma.seller.create({
    data: {
      products: {
        create: []
      },
      rating: .0,
      phone,
      userId,
    }
  })
  return newSeller
}
