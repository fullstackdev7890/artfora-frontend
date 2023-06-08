import { defineStore } from 'pinia'
import axios from 'axios'
import { TextsState } from '~~/types/texts'

export const useTextsStore = defineStore('texts', {
  state: (): TextsState => ({
    items: {
      total: 0,
      current_page: 1,
      last_page: 1,
      data: []
    }
  }),
  
  actions: {
    async fetchAll() {
      const response = await axios.get('/texts', { })
      this.$state.items = response.data
    },
    getByname(name: string) {
      const row = this.$state.items.data.find((row) => row.text_name === name)
      return row
    }
  },
})
