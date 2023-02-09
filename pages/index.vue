<template>
  <main class="home-page">
    <main-container>
<!--      These are test switches. In the future, everything will be done according to the layout through the gallery settings menu-->
      <div class="switch">
        <span class="switch-item" @click="galleryViewType = JUSTIFIED_GALLERY_VIEW_TYPE">Justified</span>
        <span class="switch-item" @click="galleryViewType = SQUARE_GALLERY_VIEW_TYPE">Square</span>
        <span class="switch-item" @click="galleryViewType = DETAILS_GALLERY_VIEW_TYPE">Details</span>
      </div>

      <gallery :cols="galleryImages" :view-type="galleryViewType" />
    </main-container>
  </main>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { useHead } from '@vueuse/head'
import { onMounted, onUnmounted } from 'vue'
import { useProductsStore } from '~/store/products'
import { Product } from '~/types/products'
import {
  JUSTIFIED_GALLERY_VIEW_TYPE,
  SQUARE_GALLERY_VIEW_TYPE,
  DETAILS_GALLERY_VIEW_TYPE,
  MOBILE_WIDTH,
  TABLET_WIDTH,
  LAPTOP_WIDTH,
  LARGE_WIDTH
} from '~/types/products'
import Gallery from '~/components/Gallery/Gallery.vue'
import MainContainer from '~/components/Layout/MainContainer.vue'

const title = ref('')
const description = ref('')
const galleryImages = ref([])
const galleryViewType = ref(JUSTIFIED_GALLERY_VIEW_TYPE)
const products = useProductsStore()

useHead({
  title: title,
  meta: [
    { name: 'description', content: description },
    { name: 'content-type', content: 'text/html; charset=UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' }
  ]
})

onMounted(() => {
  if (process.client) {
    sortImagesByColumns(products.items)

    window.addEventListener('resize', () => sortImagesByColumns(products.items))
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', () => sortImagesByColumns(products.items))
})

function getColumnsCount() {
  if (!process.client) {
    return 1
  }

  const columnsCounts = {
    [MOBILE_WIDTH]: 2,
    [TABLET_WIDTH]: 3,
    [LAPTOP_WIDTH]: 4,
    [LARGE_WIDTH]: 5
  }

  return Object.entries(columnsCounts)
      .reduce((result, [size, columns]) => window.innerWidth > size ? columns : result, 5)
}

function sortImagesByColumns (images: Product[]) {
  const columnsCount = getColumnsCount()

  galleryImages.value = Array(columnsCount).fill().map(() => [])

  let currentColumn = 0

  images.forEach((item: Product) => {

    galleryImages.value[currentColumn].push(item)

    currentColumn++

    if (currentColumn >= galleryImages.value.length) {
      currentColumn = 0
    }
  })
}
</script>