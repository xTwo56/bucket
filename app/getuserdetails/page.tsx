"use client"

import { useSession } from "next-auth/react"

export default function Getuserdetails() {

  const session = useSession()
  console.log("session from comp: " + JSON.stringify(session))
  return (
    <div>
      {JSON.stringify(session.data?.user)}
    </div>
  )

}
