export interface Category {
  id: string
  title: string
  slug: string
}

export interface GetCategoriesResponse {
  categories: Category[]
}
