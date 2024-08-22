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
  const quantityRef = useRef<HTMLInputElement>(null)

  return (
    <div>
      Sell
      <button onClick={handleNavigation}>Join</button>
      <input ref={productRef} placeholder="product" type="text" />
      <input ref={priceRef} placeholder="price" type="number" />
      <input ref={descriptionRef} placeholder="descrption" type="text" />
      <input ref={quantityRef} placeholder="quantity" type="number" />
      <button onClick={onClickHandler}>submit</button>
    </div>
  )

  async function onClickHandler() {

    if (!productRef.current ||
      !priceRef.current ||
      !descriptionRef.current ||
      !quantityRef.current) {

      console.log("possible null input")
      return
    }

    const name = productRef.current.value
    const priceString = priceRef.current.value
    const price = parseInt(priceString)
    const description = descriptionRef.current.value
    const quantity = parseInt(quantityRef.current.value, 10)

    if (!name || !price || !description || !quantity) {
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
    console.log("sellerId: " + sellerId)
    const newProduct = await addProduct({ name, description, price, quantity, sellerId });
    console.log("newProduct: " + newProduct)
    alert("product added successfully!")
  };

  function handleNavigation() {
    router.push("/sell/join")
  }
}


