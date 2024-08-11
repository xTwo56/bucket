'use client'

import { useRef } from "react"
import { addProduct } from "@/actions/product/addProduct"
import { useRouter } from "next/navigation"

export default function Sell() {
  const router = useRouter()
  const productRef = useRef<HTMLInputElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)
  const sellerIdRef = useRef<HTMLInputElement>(null)

  return (
    <div>
      Sell
      <button onClick={handleNavigation}>Join</button>
      <input ref={productRef} placeholder="product" type="text" />
      <input ref={priceRef} placeholder="price" type="number" />
      <input ref={descriptionRef} placeholder="descrption" type="text" />
      <input ref={sellerIdRef} placeholder="sellerId" type="string" />
      <button onClick={onClickHandler}>submit</button>
    </div>
  )

  async function onClickHandler() {

    if (!productRef.current || !priceRef.current || !descriptionRef.current || !sellerIdRef.current) {
      console.log("possible null input")
      return
    }

    const name = productRef.current.value
    const price = priceRef.current.value
    const description = descriptionRef.current.value
    const sellerId = sellerIdRef.current.value

    if (!name || !price || !description || !sellerId) {
      console.log("fill all details")
      return;
    }
    console.log("before call")
    const newProduct = addProduct({ name, description, price, sellerId });
    console.log("newProduct: " + newProduct)
  };

  function handleNavigation() {
    router.push("/sell/join")
  }
}


