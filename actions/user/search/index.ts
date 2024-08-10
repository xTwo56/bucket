
"use server"

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export async function findUser(email) {
  console.log("inside search")
  let user = await prisma.user.findUnique({
    where: {
      email
    }
  })
  return user;
}
