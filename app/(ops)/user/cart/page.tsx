"use client"

import { useEffect, useState } from "react"
import { getCart } from "@/actions/cart/getCart"
import { CartType } from "./types"
import Navbar from "@/components/buy/navbar"
import CartItemsCard from "@/components/user/cartItemsCard"

export default function Cart() {

  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState<CartType | null>(null)

  async function getCartData() {
    const cart = await getCart()
    console.log("cart: " + JSON.stringify(cart))
    setCart(cart)
  }

  useEffect(() => {
    getCartData()
    setLoading(false)
  }, [])

  return (
    <div>
      <Navbar />
      {loading ? "loading" :
        !cart ? "empty cart" :
          cart.cartItems?.map((item) => (
            <CartItemsCard key={item.product?.id}
              productName={item.product?.name} productPrice={item.product?.price} />
          ))}
    </div>
  )
}

{/* {loading || !cart ? "loading" : */ }
{/*   cart.map((product, index) => ( */ }
{/*     <div key={product.id}> */ }
{/*       <img className="" */ }
{/*         src="" alt="productImage" /> */ }
{/*       <div>{product.name}</div> */ }
{/*       <div>{product.price}</div> */ }
{/**/ }
{/*     </div> */ }
{/*   ))} */ }
