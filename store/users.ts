import { defineStore } from 'pinia'
import { UsersState } from '~/types/users'
import axios from 'axios'
import {Paginated} from "~/types/search";

export const useUsersStore = defineStore('users', {
  state: (): UsersState => ({
    users: {
      total: 0,
      current_page: 1,
      last_page: 1,
      data: []
    },
    user: {
      id: 1,
      username: '',
      tagname: '',
      email: '',
      password: '',
      phone: '',
      description: '',
      country: '',
      background_image_id: 0,
      avatar_image_id: 0,
      product_visibility_level: 0,
      background_image: null,
      more_external_link: [],
      avatar_image: null,
      role_id: 0,
      external_link: '',
      can_add_product: false,
    },
    filters: {
      per_page: 1000,
      page: 1,
      desc: 1
    },
    loadingNextPage: false,
    pendingCount: 0
  }),

  actions: {
    async fetchAll() {
      this.$state.filters.page = 1

      const response = await axios.get('/users', { params: this.$state.filters })
      console.log(response.data)
      this.$state.users = response.data
    },
    
    async delete(id: number) {
      const response = await axios.delete(`/users/${id}`)
      this.$state.users = response.data
   },

   async update(id: number, filters: {}) {
     const response = await axios.put(`/users/${id}`, { ...filters })
     return response
  },
  }
})



