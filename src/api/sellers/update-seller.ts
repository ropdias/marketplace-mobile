import { Seller } from '@/@types/seller'
import { api } from '@/lib/axios'

export interface updateSellerBody {
  name: string
  phone: string
  email: string
  avatarId?: string | null
  password: string | null
  newPassword: string | null
}

export interface UpdateSellerResponse {
  seller: Seller
}

export interface UpdateSellerProps {
  body: updateSellerBody
  accessToken: string
}

export async function updateSeller({ body, accessToken }: UpdateSellerProps) {
  const { name, phone, email, avatarId, password, newPassword } = body

  const response = await api.put<UpdateSellerResponse>(
    '/sellers',
    {
      name,
      phone,
      email,
      avatarId: avatarId ?? undefined,
      password: password ?? undefined,
      newPassword: newPassword ?? undefined,
    },
    {
      headers: {
        Cookie: accessToken,
      },
    },
  )
  return response.data
}
