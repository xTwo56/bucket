"use client"

import { addSeller } from "@/actions/seller/addSeller/index";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function JoinAsSeller() {

  const router = useRouter()
  const { data: session } = useSession()
  const phoneRef = useRef<HTMLInputElement>(null);
  const userId = session.user.userId;
  return (
    <div>
      <input ref={phoneRef} placeholder="phone" type="text" />
      <button onClick={onClickHandler}>submit</button>
    </div>
  )

  async function onClickHandler() {
    if (!phoneRef.current || !userId) {
      console.log("possible null input")
      return
    }
    const phone = phoneRef.current.value

    console.log("phone" + phone)
    const newSeller = await addSeller({ phone, userId })
    console.log(newSeller)
    router.push("/sell")
  }

}
