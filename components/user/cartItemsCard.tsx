import { removeCartItem } from "@/actions/cart/removeCartItem";
import { CartItemCardType } from "@/types/CartItemsCardType";

export default function CartItemsCard({ productName, productPrice, productQuantity, itemQuantity, itemId }: CartItemCardType) {
  return (
    <div className="p-4 border-2">
      <div>{productName}</div>
      <div>{productPrice}</div>
      <div>{itemQuantity}</div>
      <input placeholder="quantity" type="number" />
      <button onClick={() => removeCartItem(itemId)}> cancel</button>
    </div>
  )
}
