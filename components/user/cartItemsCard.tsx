import { removeCartItem } from "@/actions/cart/removeCartItem";
import { ProductType } from "@/actions/product/types";
import { CartItemType } from "@/app/(ops)/user/cart/types";
import { CartItemCardType } from "@/types/CartItemsCardType";

export default function CartItemsCard({ item }: { item: CartItemType }) {
  if (!item.product) {
    console.log("cartItem is not completely defined")
    return null
  }
  return (
    <div className="p-4 border-2">
      <div>{item.product.name}</div>
      <div>{item.price}</div>
      <div>{item.quantity}</div>
      <input placeholder="quantity" type="number" />
      <button onClick={() => removeCartItem(item.id)}> cancel</button>
    </div>
  )
}
