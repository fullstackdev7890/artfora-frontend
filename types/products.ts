import { Entity, Media, User } from '~/types/index'
import { Paginated } from '~/types/search'

export const JUSTIFIED_GALLERY_VIEW_TYPE = 'justified'
export const SQUARE_GALLERY_VIEW_TYPE = 'square'
export const DETAILS_GALLERY_VIEW_TYPE = 'details'
export const MOBILE_WIDTH = 768
export const TABLET_WIDTH = 992
export const LAPTOP_WIDTH = 1200
export const LARGE_WIDTH = 1600

export enum ProductStatus {
  Approved = 'Approved',
  Pending = 'Pending',
  Rejected = 'Rejected'
}

export declare interface Product extends Entity {
  price: number
  user_id: number
  category_id: number
  title: string
  author: string
  slug: string
  tags: string
  description: string
  is_ai_safe: boolean
  visibility_level: number
  width: number
  height: number
  weight: number
  status: string
  deleted_at: string | null
  media: Media[]
  user: User
}
export declare interface SearchProductsFilters extends SearchFilters {
  categories?: number[]
  user_id?: number | null
  status?: ProductStatus | null
}
export interface ProductsState {
  items: Paginated<Product>
  item: Product
  filters: SearchProductsFilters,
  loadingNextPage: boolean
}