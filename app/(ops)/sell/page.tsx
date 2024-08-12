'use client'

import { useRef } from "react"
import { addProduct } from "@/actions/product/addProduct"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import axios from "axios"

export default function Sell() {
  const router = useRouter()
  const { data: session } = useSession()
  const userId = session.user.userId

  const productRef = useRef<HTMLInputElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)

  return (
    <div>
      Sell
      <button onClick={handleNavigation}>Join</button>
      <input ref={productRef} placeholder="product" type="text" />
      <input ref={priceRef} placeholder="price" type="number" />
      <input ref={descriptionRef} placeholder="descrption" type="text" />
      <button onClick={onClickHandler}>submit</button>
    </div>
  )

  async function onClickHandler() {

    if (!productRef.current || !priceRef.current || !descriptionRef.current) {
      console.log("possible null input")
      return
    }

    const name = productRef.current.value
    const price = priceRef.current.value
    const description = descriptionRef.current.value

    if (!name || !price || !description) {
      console.log("fill all details")
      return;
    }

    console.log("before call")
    console.log("userId: " + userId)
    const response = await axios.post("http://localhost:3000/api/seller/getSellerFromUserId", {
      userId,
    })
    console.log("after call")
    console.log("seller: " + JSON.stringify(response))
    const sellerId = response.data.seller.id
    const newProduct = await addProduct({ name, description, price, sellerId });
    console.log("newProduct: " + newProduct)
  };

  function handleNavigation() {
    router.push("/sell/join")
  }
}


