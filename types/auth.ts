export const ADMIN_ROLE = 1
export const USER_ROLE = 1

export interface LoginData {
  email: string
  password: string
}

export interface SignUpData {
  email: string
  tagname: string
  username: string
  password: string
  confirm: string
  redirect_after_verification: string
}