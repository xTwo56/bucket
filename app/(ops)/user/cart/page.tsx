"use client"
import { useState } from "react"
import { getCart } from "@/actions/cart/getCart"

export default async function Cart() {

  const [loading, setLoading] = useState(true)
  const carts = await getCart()

  return (
    <div>
      {loading || !products ? "loading" :
        products?.map((product, index) => (
          <div key={product.id}>
            <img className=""
              src="" alt="productImage" />
            <div>{product.name}</div>
            <div>{product.price}</div>

          </div>
        ))}
    </div>
  )
}
