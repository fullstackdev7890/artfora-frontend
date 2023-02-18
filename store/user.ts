import { defineStore } from 'pinia'
import { User } from '~/types'
import axios from "axios";

export const useUserStore = defineStore('user', {
  state: (): User => ({
    id: 0,
    username: '',
    tagname: '',
    role_id: 0,
    media: {
      link: null
    }
  }),

  getters: {
    getUserAvatar: (state) => state.media.link,

    getUserRole: (state) => state.role_id,

    getUserId: (state) => state.id
  },
  actions: {
    async fetch() {
      const response = await axios.get('/profile')

      this.$state = response.data
    }
  }
})