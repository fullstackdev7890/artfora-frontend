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
        v-for="(image, index) in product.media"
        v-show="index === currentImage"
        :src="image.link"
        alt="image"
      >
      <div class="product-container-images-next" v-show="product.media.length > 1" @click="toNextImage()">
        <next-icon class="next-icon" />
      </div>
      <div class="product-container-images-prev" v-show="product.media.length > 1" @click="toPrevImage()">
        <next-icon class="prev-icon"/>
      </div>
    </div>
    <product-sidebar v-show="isShown" :image-info="product" />
  </div>
</template>

<script setup lang="ts">
import { useAsyncData, useRoute, useRouter } from '#app'
import { useProductsStore } from '~/store/products'
import { computed, ref } from 'vue'
import CloseIcon from '~/assets/svg/close.svg'
import ArrowLeft from '~/assets/svg/arrow-left.svg'
import ProductSidebar from '~/components/product/productSidebar.vue'
import NextIcon from '~/assets/svg/next.svg'

const route = useRoute()
const router = useRouter()
const products = useProductsStore()
const product = computed(() => products.item)
const isShown = ref(false)
const currentImage = ref(0)

useAsyncData('products', async () => await products.fetch(route.params.id as string))

const toggleSidebar = () => isShown.value = !isShown.value

const toBack = () => router.push('/')

const toNextImage = () => {
  if (currentImage.value + 1 < product.value.media.length) {
    currentImage.value = currentImage.value + 1
  } else currentImage.value = 0
}

const toPrevImage = () => {
  console.log(currentImage.value - 1, currentImage.value - 1 > 0)
  if (currentImage.value > 0) {
    currentImage.value = currentImage.value - 1
  } else currentImage.value = product.value.media.length - 1
}
</script>