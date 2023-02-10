import { defineStore } from 'pinia'
import axios from "axios";
import {CommissionWork} from "~/types/commissionWork";


export const useCommissionWorkState = defineStore('commission-work', {
  actions: {
    async send(userId: number, data: CommissionWork) {
      await axios.post(`/users/${userId}/commission`, data)
    }
  }
})