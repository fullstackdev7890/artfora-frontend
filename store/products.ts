import { defineStore } from 'pinia'
import { ProductStatus, ProductsState } from '~/types/products'
import { STATUS_APPROVED, STATUS_PENDING } from '~/types/constants'
import axios from 'axios'

export const useProductsStore = defineStore('products', {
  state: (): ProductsState => ({
    items: {
      total: 0,
      current_page: 1,
      last_page: 1,
      data: []
    },
    item: {
      id: 1,
      title: '',
      author: '',
      price: 0,
      user_id: 0,
      category_id: 0,
      slug: '',
      tags: '',
      description: '',
      is_ai_safe: false,
      width: 0,
      height: 0,
      weight: 0,
      status: ProductStatus.Approved,
      deleted_at: null,
      media: [],
      user: {
        id: 0,
        username: '',
        tagname: '',
        email: '',
        phone: '',
        description: '',
        country: '',
        role_id: 0,
        external_link: null,
        background_image: {
          id: 1,
          deleted_at: null,
          created_at: '',
          link: '',
          name: ''
        },
        data: {},
        "2fa_type": 'email',
        media: []
      }
    },
    filters: {
      per_page: 5,
      page: 1,
      with: ['user', 'media'],
      desc: 1
    }
  }),

  actions: {
     async fetchAll() {
      const response = await axios.get('/products', { params: this.filters })

      this.items = response.data
    },

    async fetchNextPage() {
      const response = await axios.get('/products', { params: this.filters })

      const prevProducts = [...this.items.data]
      this.items = response.data
      this.items.data = [...prevProducts, ...this.items.data]
    },

    updateFilter(filter) {
       this.filters = Object.assign({}, this.filters, filter)
    },

    async fetch(id: string) {
      // @ts-ignore
      const response = await axios.get(`/products/${id}`, { params: this.filters })

      this.current = response.data
    },

    create(item) {
      return axios.post('/products', item)
    },

    update(id: number, filters: {}) {
       return axios.put(`/products/${id}`, { ...filters })
    },
    async pendingCount(){
      const response = await axios.get('/products', {
        params: Object.assign({}, this.filters, { status: STATUS_PENDING })
      })

      return response.data.data.length
    }
  }
})



