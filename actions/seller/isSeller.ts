"use server"

import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { NEXT_AUTH } from "@/lib/auth";
const prisma = new PrismaClient()

export async function isSeller() {

  const session = await getServerSession(NEXT_AUTH)
  const userId = session.user.userId
  const response = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })
  const isSeller = response?.isSeller
  return isSeller
}
