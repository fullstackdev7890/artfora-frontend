import { Entity, Media, User } from '~/types/index'
import { Paginated } from '~/types/search'
import { SubCategory } from '~/types/categories'

export const LARGE_GALLERY_VIEW_TYPE = 'large'
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
  categories: SubCategory[]
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
  depth: number
  shipping_in_euro: number
  quantity_for_sale: number
  price_in_euro: number
  status: string
  deleted_at: string | null
  media: Media[]
  user: User
}
export declare interface SearchProductsFilters {
  categories?: number[]
  user_id?: number | null
  status?: ProductStatus | null
  page?: number
  per_page?: number
  with?: string[]
  desc?: number
  author?: string | null
}
export interface ProductsState {
  items: Paginated<Product>
  item: Product
  subCategories: SubCategory[],
  filters: SearchProductsFilters,
  loadingNextPage: boolean,
  pendingCount: number
}
export interface Seller {
  name: string,
  id: number,
  email: string
}
export interface CartType {
  id: number
  title: string
  seller?: Seller
  price_in_euro: number
  description?: string
  media?: Media[]
  height?: number
  width?: number
  depth?: number
  quantity: number
  shippingPrice?: number
}
export interface CartsState {
  carts: CartType[],
  totalShippingPrice: number,
  totalProductsPrice: number

}