export const ADMIN_ROLE = 1
export const USER_ROLE = 1

export interface LoginData {
  login: string
  password: string
}

export interface TwoFactorAuthData {
  code: string,
  email: string | null
}

export interface SignUpData {
  email: string
  tagname: string
  username: string
  password: string
  confirm: string
  redirect_after_verification: string
}

export interface VerifyData {
  token: string
}