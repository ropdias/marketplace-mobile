import { Seller } from '@/@types/seller'
import { api } from '@/lib/axios'

export interface GetSellerProfileResponse {
  seller: Seller
}

export interface GetSellerProfileProps {
  accessToken: string
}

export async function getSellerProfile({ accessToken }: GetSellerProfileProps) {
  const response = await api.get<GetSellerProfileResponse>('/sellers/me', {
    headers: {
      Cookie: accessToken,
    },
  })
  return response.data
}
