<template>
  <main class="home-page">
    <main-container>
      <gallery :items="items" />
    </main-container>
  </main>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { useHead } from '@vueuse/head'
import { useProductsStore } from '~/store/products'
import { storeToRefs } from 'pinia'
import { useAsyncData } from '#app'
import Gallery from '~/components/Gallery/Gallery.vue'
import MainContainer from '~/components/Layout/MainContainer.vue'

const title = ref('')
const description = ref('')
const products = useProductsStore()
const { items } = storeToRefs(products)
const route = useRoute()

await useAsyncData('products',async () => {

  products.updateFilter({ categories: [route.params.id], status: null, user_id: null })

  await products.fetchAll()

})

useHead({
  title: title,
  meta: [
    { name: 'description', content: description },
    { name: 'content-type', content: 'text/html; charset=UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' }
  ]
})

</script>