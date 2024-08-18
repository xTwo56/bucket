"use client"

import { useSession } from "next-auth/react"

export default function Join() {
  const { data: session } = useSession()
  const userId = session?.user?.userId;


  return (
    <div>
      join
    </div>
  )
}
