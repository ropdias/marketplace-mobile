import { isAxiosError } from 'axios'

import { Product } from '@/@types/product'
import { api } from '@/lib/axios'

export interface GetProductByIdPathParams {
  id: string
}

export interface GetProductByIdResponse {
  product: Product
}

export interface GetProductByIdProps {
  path: GetProductByIdPathParams
  accessToken: string
}

export async function getProductById({
  path,
  accessToken,
}: GetProductByIdProps) {
  const { id } = path
  const response = await api.get<GetProductByIdResponse>(`/products/${id}`, {
    headers: {
      Cookie: accessToken,
    },
  })
  return response.data
}

export function mapGetProductByIdErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const status = error.response?.status

    if (status === 404) return 'Erro: O produto não foi encontrado.'
  }

  return ''
}
