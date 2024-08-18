"use client"

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { isSeller } from "@/actions/seller/isSeller"
import { useEffect, useState } from "react"

export default function LandingRedirectingButtons() {
  const [seller, setSeller] = useState(false)

  async function loadIsSeller() {
    const response = await isSeller()
    if (!response) return
    setSeller(response)
  }

  const router = useRouter()
  useEffect(() => {
    loadIsSeller()
  }, [])

  return (
    <div className="flex justify-center m-32">
      <button className="p-4 m-4 bg-blue-500 text-white rounded"
        onClick={redirectToBuy}>buy</button>
      <button className="p-4 m-4 bg-blue-500 text-white rounded"
        onClick={redirectToSell}>sell</button>
      <button className="p-4 m-4 bg-blue-500 text-white rounded"
        onClick={redirectToRent}>rent</button>
    </div>
  )

  function redirectToBuy() {
    console.log("buy clicked")
    router.push("/buy")
  }

  function redirectToSell() {
    console.log("sell clicked")
    if (seller)
      router.push("/sell")
    else
      router.push("/sell/join")
  }

  function redirectToRent() {
    console.log("rent clicked")
    router.push("/rent")
  }
}
