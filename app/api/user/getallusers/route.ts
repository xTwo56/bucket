
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient()

export async function GET() {
  const users = await prisma.user.findMany({
    include: {
      seller: true
    }
  })
  if (!users)
    return NextResponse.json({
      msg: "no user found"
    })
  console.log("users: " + users)
  return NextResponse.json({
    users
  });
}

