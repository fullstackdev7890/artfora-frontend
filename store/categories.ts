import { defineStore } from 'pinia'
import { CategoriesState } from '~/types'
import axios from 'axios'
import {Category} from "~/types/categories";

export const useCategoriesStore = defineStore('categories', {
  state: (): CategoriesState => ({
    items: [],
    filters: {
      all: 1
    }
  }),

  getters: {
    categories: (state) => state.items.filter((item) => !item.parent_id),

    categoriesSelector: (state) => {
      const selectors = state.items.map(category => {
        return { title: category.title, key: category.id }
      })

      return selectors
    }
  },

  actions: {
    async fetch() {
      await axios.get('/categories', { params: { with: ['children'], all: 1 } })
        .then((response) => {
          this.items = response.data.data
        })
    }
  },
})