import { defineStore } from 'pinia'
import axios from 'axios'
import { FiltersState } from '~~/types/filters'

export const useFiltersStore = defineStore('filters', {
  state: (): FiltersState => ({
    items: {
      total: 0,
      current_page: 1,
      last_page: 1,
      data: []
    }
  }),
  
  actions: {
    async fetchAll() {
      const response = await axios.get('/filters', { })
      this.$state.items = response.data
    },
    getById(id: number) {
      const row = this.$state.items.data.find((row) => row.id === id)
      return row
    }
  },
})
