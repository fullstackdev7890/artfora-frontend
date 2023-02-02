export * from './state'

export declare interface Entity {
  id: number

  created_at?: string | Date
  updated_at?: string | Date
}

export declare interface Media extends Entity {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
  link: string
  is_public?: boolean
  name?: string
  owner_id?: number
}

export interface User extends Entity {
  first_name: string
  last_name: string
  role_id: number
  email: string
}

export declare interface ProductItem extends Entity {
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
  media: Media

  // test key-value
  author_tag: string
  author_avatar: string
}

export interface Products {
  [index: number]: ProductItem
}

export interface ProductsState {
  items: Products
}