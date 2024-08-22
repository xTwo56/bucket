"use client"

import { addToCart } from "@/actions/cart/addToCart";
import { ProductType } from "@/actions/product/types";
import axios from "axios";
import { useEffect, useState } from "react";


export default function ProductCard() {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<ProductType[] | null>(null)

  async function loadProducts() {
    const response = await axios.get("http://localhost:3000/api/product/getallproducts");
    console.log(response.data.products)
    const productPayload = response.data.products

    setLoading(false)
    setProducts(productPayload)
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <div>
      {loading || !products ? "loading" :
        products?.map((product, index) => (
          <div key={product.id}
            className="p-4 border-2">
            <img className=""
              src="" alt="productImage" />
            <div>{product.name}</div>
            <div>{product.price}</div>
            <div>left: {product.quantity}</div>

            <button onClick={async () => {
              console.log("addToCart clicked")
              const response = await addToCart(product.id, product.quantity)
              console.log(response)
              if (!response?.success) {
                alert("no items left")
              }
            }}>addToCart</button>
          </div>
        ))}
    </div>
  )
} 
