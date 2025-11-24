import { isAxiosError } from 'axios'

import { Seller } from '@/@types/seller'
import { api } from '@/lib/axios'

export interface CreateSellerBody {
  name: string
  phone: string
  email: string
  avatarId: string | null
  password: string
  passwordConfirmation: string
}

export interface CreateSellerResponse {
  seller: Seller
}

export interface CreateSellerProps {
  body: CreateSellerBody
  accessToken: string
}

export async function createSeller({ body, accessToken }: CreateSellerProps) {
  const { name, phone, email, avatarId, password, passwordConfirmation } = body

  const response = await api.post<CreateSellerResponse>(
    '/sellers',
    {
      name,
      phone,
      email,
      avatarId,
      password,
      passwordConfirmation,
    },
    {
      headers: {
        Cookie: accessToken,
      },
    },
  )
  return response.data
}

export function mapCreateSellerErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const status = error.response?.status

    if (status === 404) return 'Erro: O avatar não foi encontrado.'

    if (status === 409) return 'Erro: O e-mail ou telefone já existe.'
  }

  return ''
}
