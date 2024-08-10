import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { findUser } from "@/actions/user/search";
import { createUser } from "@/actions/user/create";
const prisma = new PrismaClient()

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "username", type: "text", placeholder: "username" },
        email: { label: "email", type: "text", placeholder: "email" },
        password: { label: "password", type: "text", placeholder: "password" },
      },
      async authorize(credentials, req) {

        const username = credentials?.username as string
        const email = credentials?.email as string
        const password = credentials?.password as string
        try {
          let user = await findUser(email);
          console.log(user)
          if (!user) {
            user = await createUser({
              username,
              email,
              password,
              isSeller: false
            })
          };
          return user;

        } catch (err) {
          console.log(err)
        }
      },
    })
  ],
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }
