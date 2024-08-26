"use client"

import { cancelItem } from "@/actions/user/orders/cancelItem";
import Navbar from "@/components/buy/navbar";
import { OrderItemType } from "@/types/OrderItemType";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Order() {

  const [orderItems, setOrderItems] = useState()
  const { data: session } = useSession()
  const userId = session?.user?.userId

  async function fetchOrder() {
    const response = await axios.post("http://localhost:3000/api/user/order/getOrder", { userId })
    console.log("response from fetchOrder:\n" + JSON.stringify(response))
    setOrderItems(response.data.order)
  }

  useEffect(() => {
    fetchOrder()
  }, [])

  return (
    <div>
      <Navbar />
      {!orderItems ? (
        <div>empty</div>
      ) : (
        orderItems.map((item) => (
          <div key={item.id}
            className="p-4 border-2 m-2">
            <div>{item.productId}</div>
            <div>{item.product.name}</div>
            <div>{item.quantity}</div>
            <div>{item.price}</div>
            <button onClick={() => cancelItemHandler(item.id)}>cancel</button>
          </div>
        )))}
    </div>
  )

  async function cancelItemHandler(itemId: any) {
    console.log("itemId: " + itemId)
    await cancelItem(itemId);
  }

}
