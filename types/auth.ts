export const ADMIN_ROLE = 1
export const USER_ROLE = 1

export interface LoginData {
  email: string
  password: string
}

export interface SignUpData {
  email: string
  tagName: string
  userName: string
  password: string
  repeatPassword: string
}