"use client"

import { addSeller } from "@/actions/seller/addSeller/index";
import { useRef } from "react";

export default function JoinAsSeller() {

  const phoneRef = useRef<HTMLInputElement>(null);
  const userIdRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <input ref={phoneRef} placeholder="phone" type="text" />
      <input ref={userIdRef} placeholder="userId" type="text" />
      <button onClick={onClickHandler}>submit</button>
    </div>
  )

  async function onClickHandler() {
    if (!phoneRef.current || !userIdRef.current) {
      console.log("possible null input")
      return
    }
    const phone = phoneRef.current.value
    const userId = userIdRef.current.value

    console.log("phone" + phone)
    const newSeller = await addSeller({ phone, userId })
    console.log(newSeller)
  }

}
