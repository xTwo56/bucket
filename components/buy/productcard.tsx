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
          <div key={index}>
            <img className=""
              src="" alt="productImage" />
            <div>{product.name}</div>
            <div>{product.price}</div>
            <button onClick={onClickHandler}>addToCart</button>
          </div>
        ))}
    </div>
  )

  async function onClickHandler() {
    console.log("add to cart clicked")
    await addToCart()
  }
} 
