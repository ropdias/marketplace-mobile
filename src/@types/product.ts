import { Attachment } from './attachment'
import { Category } from './category'
import { Seller } from './seller'

export enum ProductStatus {
  AVAILABLE = 'available',
  SOLD = 'sold',
  CANCELLED = 'cancelled',
}

export interface Product {
  id: string
  title: string
  description: string
  priceInCents: number
  status: ProductStatus
  owner: Seller
  category: Category
  attachments: Attachment[]
}
