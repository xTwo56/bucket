"use server"

import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
const prisma = new PrismaClient()

export async function clearAll() {

  await prisma.product.deleteMany({})
  await prisma.seller.deleteMany({})
  await prisma.user.deleteMany({})

  return NextResponse.json({
    msg: "all data cleared"
  })

}
