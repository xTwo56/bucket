import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
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
        try {
          let user = await prisma.user.findUnique({
            where: {
              email: credentials?.email
            }
          })
          if (!user) {
            const newUser = await prisma.user.create({
              data: {
                username: credentials?.username as string,
                email: credentials?.email as string,
                password: credentials?.password as string
              }
            })
            return newUser;
          };

          user = await prisma.user.findUnique({
            where: {
              email: credentials?.email,
              username: credentials?.username,
              password: credentials?.password
            }
          })
          if (!user) {
            return NextResponse.json({
              msg: "invalid credentials"
            })
          }
          console.log("user: " + user)
          return user

        } catch (err) {
          console.log(err)
        }
      },
    })
  ],
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }
