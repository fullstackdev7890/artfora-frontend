import { StringMappingType } from 'typescript'

export * from './state'

export const HEADER_HEIGHT = 100

export declare interface Entity {
  id: number
  created_at?: string | Date
  updated_at?: string | Date
}

export interface Text {
  id: number
  text_name: string
  text_content: string
  text_color: string
}

export interface Filter {
  id: number
  filter: string
}

export declare interface Media extends Entity {
  id: number
  deleted_at: string | null
  link: string | null
  is_public?: boolean
  name?: string
  owner_id?: number
}

export interface User extends Entity {
  id: number
  username: string
  tagname: string
  email: string
  password?: string
  phone: string
  description: string
  country: string
  background_image_id?: number | null
  avatar_image_id?: number | null
  product_visibility_level: number | null
  background_image: Media | null,
  avatar_image: Media | null,
  role_id: number
  external_link: string | null
  email_verified_at?: string | null
  deleted_at?: string | null
  media?: Media
  more_external_link: [] | []
}

export interface UsersState {
  currentUser: User
}

export interface Setting extends Entity {
  name: string
  value: object
  is_public: boolean
}



