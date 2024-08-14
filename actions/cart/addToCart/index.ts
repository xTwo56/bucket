"use server"

import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "@/lib/auth"
const prisma = new PrismaClient()

export async function addToCart() {

  const response = await getServerSession(NEXT_AUTH)
  console.log("response: " + JSON.stringify(response))

}
