"use client"

import SignIn from "./signIn";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter()
  return (
    <div className="flex justify-between bg-gray-600 p-4 items-center">
      <b className="text-4xl text-blue-900">Buy</b>
      <div className="flex flex-row gap-8">
        <button onClick={navigateToOrder}>Order</button>
        <button onClick={navigateToCart}> Cart </button>
        <SignIn />
      </div>
    </div>
  )

  function navigateToCart() {
    console.log("cart clicked")
    router.push("/user/cart")
  }

  function navigateToOrder() {
    console.log("cart clicked")
    router.push("/user/order")
  }
}
