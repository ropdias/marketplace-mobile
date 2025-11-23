import { Seller } from '@/@types/seller'
import { api } from '@/lib/axios'

export interface GetSellerProfileResponse {
  seller: Seller
}

export async function getSellerProfile() {
  const response = await api.get<GetSellerProfileResponse>('/sellers/me')
  return response.data
}
