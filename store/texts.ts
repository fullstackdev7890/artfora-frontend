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
      const response = await axios.get('/texts', {})
      this.$state.items.data = response.data
    },
    getByname(name: string) {
      const row = this.$state.items?.data.find((row) => row.text_name === name)
      const sortedArr = row.sort((a, b) => a?.text_order - b?.text_order);

      return sortedArr
    },
    getFaq() {
      const row = this.$state.items?.data.filter((row) => row.text_name === 'faq')
      const sortedArr = row.sort((a, b) => a?.text_order - b?.text_order);
      return sortedArr
    },
    getArtfora() {
      const row = this.$state.items?.data.filter((row) => row.text_name === 'about')
      const sortedArr = row.sort((a, b) => a?.text_order - b?.text_order);
      return sortedArr
    },
    getAiSafe() {
      const row = this.$state.items?.data.filter((row) => row.text_name === 'ai_safe')
      const sortedArr = row.sort((a, b) => a?.text_order - b?.text_order);
      return sortedArr
    },
    getSellerSupport() {
      const row = this.$state.items?.data.filter((row) => row.text_name === 'seller_support')
      const sortedArr = row.sort((a, b) => a?.text_order - b?.text_order);
      return sortedArr
    },
    getSupport(name: string) {
      const row = this.$state.items?.data.filter((row) => row.text_name === name)
      const sortedArr = row.sort((a, b) => a?.text_order - b?.text_order);
      return sortedArr
    },
  },
})
