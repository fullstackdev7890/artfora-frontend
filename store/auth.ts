import type { AuthState } from '~/types/state'
// @ts-ignore
import { defineStore } from 'pinia'
import { LoginData, VerifyData } from "~/types/auth"
import axios from 'axios'
import { navigateTo } from "#imports"

export const useAuthStore = defineStore('auth', {
  persist: true,

  state: (): AuthState => ({
    token: null
  }),

  getters: {
    isAuthorized: (state) => state.token !== null
  },

  actions: {
    async login(data: LoginData) {
      return await axios.post('/auth/login', data)
    },

    async signUp(data: LoginData) {
      return await axios.post('/auth/register', data)
    },

    async verifyEmail(data: VerifyData) {
      return await axios.post('/auth/register/email/verify', data)
    },

    async logout() {
      // @ts-ignore
      this.token = null

      // temporary solution
      window.location.href = '/'

      // make it work right
      // navigateTo('/')
    },

    async refreshToken() {
      const response = await axios.get('/auth/refresh')

      // @ts-ignore
      this.token = response.data.token

      return response.data.token
    }
  }
})