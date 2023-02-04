import type { AuthState } from '~/types/state'
// @ts-ignore
import { defineStore } from 'pinia'
import { LoginData } from "~/types/auth"
import axios from 'axios'
import {navigateTo} from "#imports"

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
      return await axios.post('/login', data)
    },

    async logout() {
      // @ts-ignore
      this.token = null

      navigateTo('/login')
    },

    async refreshToken() {
      const response = await axios.get('/auth/refresh')

      // @ts-ignore
      this.token = response.data.token

      return response.data.token
    }
  }
})