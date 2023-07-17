export interface LoginData {
  login: string
  password: string
  remember_me: boolean
}

export interface TwoFactorAuthData {
  code: string,
  email: string | null,
  remember_me: boolean
}

export interface ResetPasswordData {
  login: string
}
export interface Address {
  country: string
  city: string
  address: string
  state: string
  postal_code: string
}
export interface RestorePasswordData {
  password: string
  confirm: string
  token: string
}

export interface CheckResetPasswordTokenData {
  token: string
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