// @ts-ignore
import { defineStore } from 'pinia'
import type { RootState } from '~/types/state'

export const useStore = defineStore({
  id: 'root',

  state: (): RootState => ({
    title: 'Usssa events management',
    pendingRequestsCount: 0
  })
})