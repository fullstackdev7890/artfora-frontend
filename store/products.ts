import { defineStore } from 'pinia'
import { ProductsState } from '~/types/state'
import axios from 'axios'
import {SymbolKind} from "vscode-languageserver-types";
import Object = SymbolKind.Object;

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
      with: ['User', 'media']
    }
  }),

  actions: {
     async fetchAll(filters = {}) {
       const filter = Object.assign({}, this.filters, filters)
      const response = await axios.get('/products', {
          params: filter
      })

      this.items = response.data.data
    },

    fetch(id: string) {
      // @ts-ignore
      this.item = this.items.find(el => el.id == id as unknown as number)
    },

    create(item) {
      return axios.post('/products', item)
    }
  }
})



