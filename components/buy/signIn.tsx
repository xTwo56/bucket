"use client"

import { useSession } from "next-auth/react"

export default function SignIn() {

  const { data: session, status } = useSession()
  return (
    <div>
      {status == "authenticated" ?
        <img className="w-16 h-16 rounded-full"
          src="/pfpDefault.jpg" alt="pfp" /> :
        <button>Signin</button>}
    </div>
  )
}
