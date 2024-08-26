import { ProductType } from "@/actions/product/types"

export interface CartItemType {
  id: string | null,
  cartId: string,
  cartItemId?: string,
  productId: string,
  price: number,
  quantity: number,
  product: ProductType | null,
}

export interface CartType {
  id: string | null,
  userId: string,
  cartItems: CartItemType[] | null
}
