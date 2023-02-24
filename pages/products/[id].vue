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
        v-for="(image, index) in item.media"
        v-show="index === currentImage"
        :src="getImageUrl(image)"
        alt="image"
      >

      <div class="product-container-images-next" v-show="item.media.length > 1" @click="toNextImage()">
        <next-icon class="next-icon" />
      </div>

      <div class="product-container-images-prev" v-show="item.media.length > 1" @click="toPrevImage()">
        <next-icon class="prev-icon"/>
      </div>

    </div>

    <product-sidebar v-show="isShown" :image-info="item" />

  </div>
</template>

<script setup lang="ts">
import { useAsyncData, useRoute, useRouter } from '#app'
import { useProductsStore } from '~/store/products'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import CloseIcon from '~/assets/svg/close.svg'
import ArrowLeft from '~/assets/svg/arrow-left.svg'
import ProductSidebar from '~/components/Products/ProductSidebar.vue'
import NextIcon from '~/assets/svg/next.svg'
import useMedia from '~/composable/media'

const route = useRoute()
const router = useRouter()
const products = useProductsStore()
const { item } = storeToRefs(products)
const isShown = ref(false)
const currentImage = ref(0)
const { getImageUrl } = useMedia()

await useAsyncData('get-product', async () => {
  await products.fetch(route.params.id as string)
})

function toggleSidebar() {
  isShown.value = !isShown.value
}

function toBack() {
  router.push('/')
}

function toNextImage() {
  if (++currentImage.value >= item.value.media.length) {
    currentImage.value = 0
  }
}

function toPrevImage() {
  if (--currentImage.value < 0) {
    currentImage.value = item.value.media.length - 1
  }
}
</script>