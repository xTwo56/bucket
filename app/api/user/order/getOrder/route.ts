import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export async function POST(req: NextResponse) {
  const body = await req.json()
  const userId = body.userId
  console.log("userId: " + userId)

  const order = await prisma.orderItems.findMany({
    where: {
      userId,
    },
    include: {
      product: true
    }
  })
  return NextResponse.json({
    order
  })
}
