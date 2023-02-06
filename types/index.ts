export * from './state'

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
  role_id: number
  email: string
  media: Media
}

