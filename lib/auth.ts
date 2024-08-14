import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { findUser } from "@/actions/user/search";
import { createUser } from "@/actions/user/create";
export const NEXT_AUTH = {
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
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: ({ session, user, token }): any => {
      // console.log("session: " + JSON.stringify(session))
      // console.log("user: " + JSON.stringify(user))
      // console.log("token: " + JSON.stringify(token))
      console.log("session.user: " + JSON.stringify(session.user))
      if (!session || !session.user) return session;
      session.user.userId = token.sub
      console.log("session.sellerId: " + session.user.sellerId)
      return session
    }
  }
}
