import { defineStore } from 'pinia'
import { CategoriesState } from '~/types'
import axios from 'axios'
import {Category} from "~/types/categories";

export const useCategoriesStore = defineStore('categories', {
  state: (): CategoriesState => ({
    items: [],
    filters: {
      with: ['children'],
      only_parents: 1
    }
  }),

  actions: {
    async fetch() {
      await axios.get('/categories', { params: this.filters })
        .then((response) => {
          this.items = response.data.data
        })
    }
  },
})