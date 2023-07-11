import { defineStore } from 'pinia'
import { User } from '~/types'
import axios from 'axios'
import { useCartStore } from './cart'
const initState = (): User => ({
  id: 0,
  username: '',
  tagname: '',
  email: '',
  password: '',
  phone: '',
  description: '',
  country: '',
  background_image_id: null,
  avatar_image_id: null,
  role_id: 0,
  external_link: null,
  email_verified_at: null,
  deleted_at: null,
  product_visibility_level: null,
  background_image: null,
  more_external_link: [],
  can_add_product: false,
  avatar_image: {
    id: 0,
    link: '',
    deleted_at: null
  },
  media: {
    id: 0,
    link: '',
    deleted_at: ''
  },
  inv_name: "",
  inv_address: "",
  inv_address2: "",
  inv_zip: "",
  inv_city: "",
  inv_state: "",
  inv_country: "",
  inv_phone: "",
  inv_email: "",
  inv_att: "",
  dev_address: "",
  dev_name: "",
  dev_address2: "",
  dev_zip: "",
  dev_city: "",
  dev_state: "",
  dev_country: "",
  dev_phone: "",
  dev_email: "",
  dev_att: "",
  sel_name: "",
  sel_address: "",
  sel_address2: "",
  sel_zip: "",
  sel_city: "",
  sel_state: "",
  sel_country: "",
  sel_phone: "",
  sel_email: "",
  sel_att: "",
  seller_support: false,
  buyer_support: true,
})
export const useUserStore = defineStore('user', {
  state: initState,

  getters: {
    userAvatar: (state) => state.avatar_image,

    getUserRole: (state) => state.role_id,
  },
  actions: {
    async fetch() {
      const cartStore = useCartStore()

      const response = await axios.get('/profile')
      if (response.data.more_external_link == null) {
        response.data.more_external_link = [];
      }
      this.$state = response.data
      await cartStore.getCarts()
    },

    async updateProfile(data: {}) {
      await axios.put('/profile', data)

      await this.fetch()
    },

    clearProfile() {
      this.$state = initState()
    }
  }
})