"use client"

import { clearAll } from "@/actions/super/clearAll"

export default function ClearAll() {
  return (
    <div>
      <button onClick={onClickHandler}>confirm</button>
    </div>
  )

  async function onClickHandler() {
    await clearAll()
  }
}
