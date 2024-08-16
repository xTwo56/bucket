"use client"

import SignIn from "./signIn";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter()
  return (
    <div className="flex justify-between bg-blue-200 p-4 items-center">
      <b className="text-4xl text-blue-900">Buy</b>
      <div className="flex flex-row gap-8">
        <button onClick={onClickHandler}> Cart </button>
        <SignIn />
      </div>
    </div>
  )

  async function onClickHandler() {
    console.log("cart clicked")
    router.push("/user/cart")
  }
}
