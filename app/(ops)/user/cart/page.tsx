"use client"

import { useEffect, useState } from "react"
import { getCart } from "@/actions/cart/getCart"
import { CartType } from "./types"
import Navbar from "@/components/buy/navbar"
import CartItemsCard from "@/components/user/cartItemsCard"
import { placeOrder } from "@/actions/user/orders/placeOrder"

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
        !cart?.cartItems ? "empty cart" :
          cart.cartItems.map((item) => {
            console.log(JSON.stringify(item))
            if (!item) return null

            return (
              <CartItemsCard key={item.product?.id} item={item} />
            );
          })
      }
      <button className="p-2 m-4 border-2" onClick={confirmOrder}>
        Confirm
      </button>
    </div>
  );

  async function confirmOrder() {
    console.log("confirm clicked");
    await placeOrder(cart?.cartItems);
  }

  async function getTotalPrice() {
    await getTotalPrice()
  }
}
