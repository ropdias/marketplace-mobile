import { SellerAvatar } from './seller-avatar'

export interface Seller {
  id: string
  name: string
  phone: string
  email: string
  avatar: SellerAvatar | null
}
