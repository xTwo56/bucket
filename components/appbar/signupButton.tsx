"use client"

import { useState } from "react"
import { signOut, signIn, useSession } from "next-auth/react";

export function SignupButton() {
  const [isSigned, setIsSigned] = useState(false);
  const { status } = useSession()

  return (
    <span>
      {status == "authenticated" ? (
        <button onClick={() => {
          signOut()
        }}>SignOut</button>
      ) : (
        <button onClick={() => {
          signIn()
        }}>SignIn</button>
      )
      }
    </span>
  )
}
