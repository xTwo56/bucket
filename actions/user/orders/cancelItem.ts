"use server"

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export async function cancelItem(itemId: any) {

  await prisma.$transaction(async (prisma) => {
    await prisma.orderItems.delete({
      where: {
        id: itemId
      }
    })
  })

}
