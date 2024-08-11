"use server"

import { PrismaClient } from "@prisma/client"
import { userType } from "./types";
const prisma = new PrismaClient()

export async function createUser({ username, email, password, isSeller }: userType) {
  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password,
      isSeller
    }
  })
  return newUser;
}
