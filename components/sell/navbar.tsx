
"use client"

import SignIn from "./signIn";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter()
  return (
    <div className="flex justify-between bg-gray-600 p-4 items-center">
      <b className="text-4xl text-blue-900">Sell</b>
      <SignIn />
    </div>
  )

  async function onClickHandler() {
    console.log("cart clicked")
    router.push("/user/cart")
  }
}

