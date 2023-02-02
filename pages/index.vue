<template>
  <main class="home-page">
    <main-container>
<!--      These are test switches. In the future, everything will be done according to the layout through the gallery settings menu-->
      <div style="display: flex; flex-direction: row; justify-content: flex-start;">
        <span style="text-decoration: underline; cursor: pointer; margin: 10px" @click="galleryViewType = JUSTIFIED_GALLERY_VIEW_TYPE">Justified</span>
        <span style="text-decoration: underline; cursor: pointer; margin: 10px" @click="galleryViewType = SQUARE_GALLERY_VIEW_TYPE">Square</span>
        <span style="text-decoration: underline; cursor: pointer; margin: 10px" @click="galleryViewType = DETAILS_GALLERY_VIEW_TYPE">Details</span>
      </div>
      <gallery :cols="galleryImages" :view-type="galleryViewType" />
    </main-container>
  </main>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { useHead } from '@vueuse/head'
import { onMounted, onUnmounted } from 'vue'
import MainContainer from '~/components/Layout/MainContainer.vue'
import Gallery from '~/components/Gallery/Gallery.vue'
import {
  JUSTIFIED_GALLERY_VIEW_TYPE,
  SQUARE_GALLERY_VIEW_TYPE,
  DETAILS_GALLERY_VIEW_TYPE,
  MOBILE_WIDTH,
  TABLET_WIDTH,
  LAPTOP_WIDTH,
  LARGE_WIDTH
} from '~/types/gallery'
import { useProductsStore } from '~/store/products'

const title = ref('')
const description = ref('')
let galleryImages = ref([])
let galleryViewType = ref(JUSTIFIED_GALLERY_VIEW_TYPE)

const products = useProductsStore()
console.log(products.items)

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

function sortImagesByColumns (images) {
  let currentColumn = 1
  let imagesCols: [[]] | [[], []] | [[], [], []] | [[], [], [], []] | [[], [], [], [], []]

  if (process.client && window.innerWidth <= MOBILE_WIDTH) {
    imagesCols = [[]]
  } else if (process.client && window.innerWidth >= MOBILE_WIDTH && window.innerWidth <= TABLET_WIDTH) {
    imagesCols = [[],[]]
  } else if (process.client && window.innerWidth >= TABLET_WIDTH && window.innerWidth <= LAPTOP_WIDTH) {
    imagesCols = [[], [], []]
  } else if (window.innerWidth >= LAPTOP_WIDTH && window.innerWidth < LARGE_WIDTH){
    imagesCols = [[], [], [], []]
  } else  if (window.innerWidth >= LARGE_WIDTH){
    imagesCols = [[], [], [], [], []]
  }

  images.forEach((item) => {
    imagesCols[currentColumn - 1].push(item)
    currentColumn++

    if (currentColumn > imagesCols.length) {
      currentColumn = 1
    }
  })

  galleryImages.value = imagesCols
}

</script>