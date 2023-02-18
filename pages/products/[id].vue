<template>
  <div class="product-container">
    <div class="product-container-btn">

      <button class="product-container-btn-info" @click="toggleSidebar">
        <span v-show="!isShown">i</span>
        <arrow-left v-show="isShown" class="hide-icon" />
      </button>

      <button class="product-container-btn-close" @click="toBack()" >
        <close-icon/>
      </button>

    </div>

    <div class="product-container-images">
      <img
        v-for="(image, index) in current.media"
        v-show="index === currentImage"
        :src="getImageUrl(image)"
        alt="image"
      >

      <div class="product-container-images-next" v-show="current.media.length > 1" @click="toNextImage()">
        <next-icon class="next-icon" />
      </div>

      <div class="product-container-images-prev" v-show="current.media.length > 1" @click="toPrevImage()">
        <next-icon class="prev-icon"/>
      </div>

    </div>

    <product-sidebar v-show="isShown" :image-info="current" />

  </div>
</template>

<script setup lang="ts">
import { useAsyncData, useRoute, useRouter } from '#app'
import { useProductsStore } from '~/store/products'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import CloseIcon from '~/assets/svg/close.svg'
import ArrowLeft from '~/assets/svg/arrow-left.svg'
import ProductSidebar from '~/components/product/productSidebar.vue'
import NextIcon from '~/assets/svg/next.svg'
import useMedia from '~/composable/media'

const route = useRoute()
const router = useRouter()
const products = useProductsStore()
const { current } = storeToRefs(products)
const isShown = ref(false)
const currentImage = ref(0)
const { getImageUrl } = useMedia()

await useAsyncData('get-product', async () => {
  await products.fetch(route.params.id as string)
})

const toggleSidebar = () => isShown.value = !isShown.value

const toBack = () => router.push('/')

const toNextImage = () => {
  if (++currentImage.value >= current.value.media.length) {
    currentImage.value = 0
  }
}

const toPrevImage = () => {
  if (--currentImage.value < 0) {
    currentImage.value = current.value.media.length - 1
  }
}
</script>