import { isAxiosError } from 'axios'

import { Product, ProductStatus } from '@/@types/product'
import { api } from '@/lib/axios'

export interface GetAllProductsFromSellerQuery {
  status?: ProductStatus
  search?: string
}

export interface GetAllProductsFromSellerResponse {
  products: Product[]
}

export interface GetAllProductsFromSellerProps {
  query: GetAllProductsFromSellerQuery
  accessToken: string
}

export async function getAllProductsFromSeller({
  query,
  accessToken,
}: GetAllProductsFromSellerProps) {
  const { status, search } = query
  const response = await api.get<GetAllProductsFromSellerResponse>(
    '/products/me',
    {
      params: {
        status,
        search,
      },
      headers: {
        Cookie: accessToken,
      },
    },
  )
  return response.data
}

export function mapGetAllProductsFromSellerErrorMessage(
  error: unknown,
): string {
  if (isAxiosError(error)) {
    const status = error.response?.status

    if (status === 404) return 'Erro: O vendedor não foi encontrado.'
  }

  return ''
}
