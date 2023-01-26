import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { AuthState, RootState} from '~/types'
import { navigateTo } from '#imports'
import axios from 'axios'
import { useAuthStore } from '~/store/auth'
import { useStore } from '~/store'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  axios.defaults.baseURL = config.public.API_BASE_URL

  const authStore = useAuthStore()
  const rootStore = useStore()

  addLoaderInterceptors(rootStore)

  refreshTokenInterceptor(authStore)

  redirectToLoginPage(authStore)
})

const addLoaderInterceptors = (store: any) => {
  axios.interceptors.request.use((config) => {
    store.pendingRequestsCount++

    return config
  }, (error) => Promise.reject(error))

  axios.interceptors.response.use((response) => {
    store.pendingRequestsCount--

    return response
  }, (error) => {
    store.pendingRequestsCount--

    return Promise.reject(error)
  })
}

const refreshTokenInterceptor = (store: any) => {
  axios.interceptors.request.use(async (config) => {
      config.headers = {
        'Authorization': `Bearer ${store.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      return config
    },
    error => {
      Promise.reject(error)
    })

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config

      if ([401, 403].includes(error.response.status) && !originalRequest._retry && originalRequest.url !== '/login') {
        originalRequest._retry = true

        const newToken = await store.refreshToken()

        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`

        return axios(originalRequest)
      }

      return Promise.reject(error)
    })

}

const redirectToLoginPage = (store: AuthState) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if ([401, 403].includes(error.response.status)) {
        store.token = null

        navigateTo('/login')
      }

      return Promise.reject(error)
    })
}
