import { CartItemCardType } from "@/types/CartItemsCardType";

export default function CartItemsCard({ productName, productPrice, quantity }: CartItemCardType) {
  return (
    <div className="p-4 border-2">
      <div>{productName}</div>
      <div>{productPrice}</div>
      <input placeholder="quantity" type="number" />
      <button> confirm</button>
    </div>
  )
}
