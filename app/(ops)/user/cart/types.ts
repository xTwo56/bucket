import { ProductType } from "@/actions/product/types"

export interface CartItemType {
  id: string | null,
  cartId: string,
  quantity: number,
  productId: string,
  product: ProductType | null
}

export interface CartType {
  id: string | null,
  userId: string,
  cartItems: CartItemType[] | null
}
