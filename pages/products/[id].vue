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
      <img :src="product.media.link" alt="image">
    </div>
    <product-sidebar v-show="isShown" :image-info="product" />
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports'
import { useAsyncData, useRoute, useRouter } from '#app'
import { useProductsStore } from '~/store/products'
import { computed, ref } from 'vue'
import CloseIcon from '~/assets/svg/close.svg'
import ArrowLeft from '~/assets/svg/arrow-left.svg'
import ProductSidebar from '~/components/product/productSidebar.vue'

definePageMeta({
  layout: 'product'
})

const route = useRoute()
const router = useRouter()
const products = useProductsStore()
const product = computed(() => products.current)
const isShown = ref(false)

useAsyncData('products', async () => {
  await products.fetchCurrentProduct(route.params.id as string)
})

const toggleSidebar = () => isShown.value = !isShown.value

const toBack = () => router.push('/')
</script>