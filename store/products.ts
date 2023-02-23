import { defineStore } from 'pinia'
import { ProductsState } from '~/types/state'
import { STATUS_APPROVED, STATUS_PENDING } from '~/types/constants'
import axios from 'axios'

export const useProductsStore = defineStore('products', {
  state: (): ProductsState => ({
    items: [],
    current: {
      id: 1,
      title: '',
      author: '',
      media: {
        id: 1,
        deleted_at: null,
        created_at: '',
        link: '',
        name: ''
      },
      user: {
        external_link: null,
        id: 1,
        username: '',
        tagname: '',
        background_image: '',
        media: {
            id: 1,
            deleted_at: null,
            created_at: '',
            link: '',
            name: ''
        }
      }
    },
    filters: {
      all: 1,
      with: ['user', 'media'],
      desc: 1
    }
  }),

  actions: {
     async fetchAll() {
      const response = await axios.get('/products', { params: this.filters })

      this.items = response.data.data
    },

    updateFilter(filter: {}) {
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

    async filterSubCategories(subCategories, parentCategory: number) {
      await this.fetchAll({ category_id: parentCategory, status: STATUS_APPROVED })

        if (subCategories.length > 0) {
          this.items = this.items.filter(el => subCategories.includes(el.category_id))
        }
    },
    async pendingCount(){
      const response = await axios.get('/products', {
        params: Object.assign({}, this.filters, { status: STATUS_PENDING })
      })

      return response.data.data.length
    }
  }
})



