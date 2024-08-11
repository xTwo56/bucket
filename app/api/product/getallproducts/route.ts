
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient()

export async function GET() {
  const products = await prisma.product.findMany()
  if (!products)
    return NextResponse.json({
      msg: "no user found"
    })
  console.log("products: " + products)
  return NextResponse.json({
    products
  });
}

