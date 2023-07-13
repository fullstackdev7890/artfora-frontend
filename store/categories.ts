import { defineStore } from 'pinia'
import { CategoriesState } from '~/types'
import axios, { AxiosResponse } from 'axios'
import { Paginated } from '~/types/search'
import { Category } from '~/types/categories'

export const useCategoriesStore = defineStore('categories', {
  state: (): CategoriesState => ({
    items: [],
    filters: {
      all: 1,
      with: ['children.products'],
      only_parents: 1,
      author: null,
      username: null
    }
  }),

  actions: {
    async fetch() {
      const response: AxiosResponse<Paginated<Category>> = await axios.get('/categories', { params: this.filters })

      /**
       * Get the categories include the current products
       */

      const categories = response.data.data.map((category) => {
        return { ...category, has_products: !!category.children.find((sub) => sub.products?.length > 0) }
      })
      this.items = categories
    },

    updateFilter(filter: any) {
      this.filters = Object.assign({}, this.filters, filter)
    },

    async clearAuthor() {
      this.filters.author = ''

      this.fetch()
    }
  },
})