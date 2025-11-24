import { Category } from '@/@types/category'
import { api } from '@/lib/axios'

export interface GetAllCategoriesResponse {
  categories: Category[]
}

export interface GetAllCategoriesProps {
  accessToken: string
}

export async function getAllCategories({ accessToken }: GetAllCategoriesProps) {
  const response = await api.get<GetAllCategoriesResponse>('/categories', {
    headers: {
      Cookie: accessToken,
    },
  })
  return response.data
}
