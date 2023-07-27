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
    emailForTwoFactorAuth: null,
    remember_me: false,
    user_inv_address: { address: "", city: "", state: "", postal_code: "", country: "" },
    user_sel_address: { address: "", city: "", state: "", postal_code: "", country: "" },
    user_dev_address: { address: "", city: "", state: "", postal_code: "", country: "" }
  }),

  getters: {
    isAuthorized: (state) => state.token !== null,
    isAwaitingTokenConfirmation: (state) => state.emailForTwoFactorAuth !== null
  },

  actions: {
    async addAddress(id: "user_inv_address" | "user_sel_address" | "user_dev_address", content: any) {
      this.$state[id] = content;

    },
    async removeAddress(id: "user_inv_address" | "user_sel_address" | "user_dev_address") {
      this.$state[id] = {address: "", city: "", state: "", postal_code: "", country: ""};
    },
    async rememberToken() {
      const rememberToken = localStorage.getItem('artfora_remember_token');
      if (rememberToken) {
        try {
          const response = await axios.get(`/auth/verify-remember-token/${rememberToken}`);
          this.$state.emailForTwoFactorAuth = null
          this.$state.token = response.data.token
          localStorage.setItem('artfora_token', response.data.token);
          navigateTo('/')

        } catch (error) {
          console.error(error);
        }
      }
    },
    async login(data: LoginData) {

      await axios.post('/auth/login', data);

      this.$state.remember_me = data.remember_me;
      return this.$state.emailForTwoFactorAuth = data.login;
    },

    async checkEmailTwoFactorAuth(data: TwoFactorAuthData) {
      const response = await axios.post('/auth/2fa/email/check', data)

      this.$state.emailForTwoFactorAuth = null
      this.$state.token = response.data.token
      localStorage.setItem('artfora_token', response.data.token);

      if (response?.data?.remember_token) {
        const rememberToken = response.data.remember_token;
        localStorage.setItem('artfora_remember_token', rememberToken);
      }

      navigateTo('/')
    },

    async removeEmailForTwoFactorAuth() {
      this.$state.emailForTwoFactorAuth = null
    },

    async resendEmailTwoFactorAuthCode(data: TwoFactorAuthData) {
      await axios.post('/auth/2fa/email/resend', data)
    },

    async signUp(data: SignUpData) {
      return await axios.post('/auth/register', data)
    },

    async verifyEmail(data: VerifyData) {
      const response = await axios.post('/auth/register/email/verify', data)

      this.$state.token = response.data.token
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
      this.$state.token = null
      localStorage.removeItem('artfora_remember_token');
      localStorage.removeItem('artfora_token');


      navigateTo('/')
    },

    async refreshToken() {
      const response = await axios.get('/auth/refresh')

      // @ts-ignore
      this.$state.token = response.data.token

      return response.data.token
    },
    async connectStrip(id: number) {
      const response = await axios.get(`/stripe-connect/${id}`)
      return response.data
    }
  }
})