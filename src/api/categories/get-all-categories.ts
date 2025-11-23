import { Category } from '@/@types/category'
import { api } from '@/lib/axios'

export interface GetAllCategoriesResponse {
  categories: Category[]
}

export async function getAllCategories() {
  const response = await api.get<GetAllCategoriesResponse>('/categories')
  return response.data
}
