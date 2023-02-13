export * from './state'

export const HEADER_HEIGHT = 100

export declare interface Entity {
  id: number
  created_at?: string | Date
  updated_at?: string | Date
}

export declare interface Media extends Entity {
  deleted_at: string | null
  link: string
  is_public?: boolean
  name?: string
  owner_id?: number
}

export interface User extends Entity {
  first_name: string
  last_name: string
  background_image: string | null,
  role_id: number
  email: string
  external_link: string | null
  media: Media
}

export interface Setting extends Entity {
  name: string
  value: object
  is_public: boolean
}

