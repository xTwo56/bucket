"use client"

import { getCart } from "@/actions/cart/getCart";
import SignIn from "./signIn";

export default function Navbar() {
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
    const carts = await getCart()
    console.log("carts: " + JSON.stringify(carts))
  }
}
