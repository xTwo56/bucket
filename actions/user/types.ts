import { SellerType } from "@/actions/seller/types"

export interface userType {
  id?: string,
  username: string,
  email: string,
  password: string,
  isSeller: boolean
  seller: SellerType
}
