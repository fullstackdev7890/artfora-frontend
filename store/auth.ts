import type { AuthState } from '~/types/state'
import { defineStore } from 'pinia'
import {
  LoginData,
  SignUpData,
  TwoFactorAuthData,
  VerifyData,
  ResetPasswordData,
  CheckResetPasswordTokenData,
  RestorePasswordData
} from '~/types/auth'
import axios from 'axios'
import { navigateTo } from '#imports'

export const useAuthStore = defineStore('auth', {
  persist: true,

  state: (): AuthState => ({
    token: null,
    emailForTwoFactorAuth: null
  }),

  getters: {
    isAuthorized: (state) => state.token !== null,
    isAwaitingTokenConfirmation: (state) => state.emailForTwoFactorAuth !== null
  },

  actions: {
    async login(data: LoginData) {
      await axios.post('/auth/login', data)

      return this.emailForTwoFactorAuth = data.login
    },

    async checkEmailTwoFactorAuth(data: TwoFactorAuthData) {
      const response = await axios.post('/auth/2fa/email/check', data)

      this.emailForTwoFactorAuth = null
      this.token = response.data.token

      navigateTo('/')
    },

    async resendEmailTwoFactorAuthCode(data: TwoFactorAuthData) {
      await axios.post('/auth/2fa/email/resend', data)
    },

    async signUp(data: SignUpData) {
      return await axios.post('/auth/register', data)
    },

    async verifyEmail(data: VerifyData, redirect: string) {
      const response = await axios.post('/auth/register/email/verify', data)

      this.token = response.data.token

      return navigateTo(redirect as string)
    },

    async resetPassword(data: ResetPasswordData) {
      await axios.post('/auth/forgot-password', data)
    },

    async checkResetPasswordToken(data: CheckResetPasswordTokenData) {
      await axios.post('/auth/restore-password/check', data)
    },

    async restorePassword(data: RestorePasswordData) {
      await axios.post('/auth/restore-password', data)
    },

    async logout() {
      // @ts-ignore
      this.token = null

      navigateTo('/')
    },

    async refreshToken() {
      const response = await axios.get('/auth/refresh')

      // @ts-ignore
      this.token = response.data.token

      return response.data.token
    }
  }
})