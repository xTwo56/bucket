import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  console.log("inside seller fetch function")
  const { userId } = await req.json()
  console.log("userId inside fetcher: " + userId)

  const seller = await prisma.seller.findUnique({
    where: {
      userId
    }
  })
  return NextResponse.json({
    seller
  });
}
