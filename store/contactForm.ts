import { defineStore } from 'pinia'
import { ContactForm } from '~/types/contactForm'
import axios from 'axios'

export const useContactFormState = defineStore('contact-form',{
  actions: {
    async send(data: ContactForm) {
      await axios.post('/contact-us', data)
    }
  }
})