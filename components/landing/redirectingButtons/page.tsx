"use client"

import { useRouter } from "next/navigation"

export default function LandingRedirectingButtons() {

  const router = useRouter()
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
    router.push("/sell")
  }

  function redirectToRent() {
    console.log("rent clicked")
    router.push("/rent")
  }
}
