
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient()

export async function GET() {
  const sellers = await prisma.seller.findMany({
    include: {
      user: true
    }
  })

  if (!sellers)
    return NextResponse.json({
      msg: "no seller found"
    })
  console.log("sellers: " + sellers)
  return NextResponse.json({
    sellers
  });
}

