import { userType } from "@/actions/user/types";

export interface SellerType {
  id: string,
  name: string,
  phone: string,
  rating: string,
  userId: string,
  user: userType;
}
