<template>
  <div
    v-if="product.status === STATUS_PENDING && getUserRole === ROLE_ADMIN"
    class="gallery-item-image-container-info gallery-item-image-container-admin"
  >
    <h4>PENDING</h4>
    <p>"{{ product.title }}"</p>
    <a href="#" class="link">see details</a>
    <button class="full-width button" @click.prevent="approveImage(product.id)">APPROVE</button>
    <button class="full-width button" @click.prevent="declinedImage(product.id)">DECLINED</button>
  </div>
  <div
    v-else
    class="gallery-item-image-container-info"
  >
    <h4>"{{ product.title }}"</h4>
    <p>by {{ product.author }}</p>
    <p>Uploaded by {{ product.user.tagname }}</p>
  </div>
</template>

<script setup lang="ts">
import { Product } from '~/types/products'
import { ROLE_ADMIN, STATUS_APPROVED, STATUS_PENDING, STATUS_REJECTED } from '~/types/constants'
import { useUserStore } from '~/store/user'
import { useProductsStore } from '~/store/products'
import { storeToRefs } from 'pinia'

interface Props {
  product: Product
}
const props = defineProps<Props>()
const userStore = useUserStore()
const productsStore = useProductsStore()
const { getUserRole } = storeToRefs(userStore)
async function approveImage(id: number) {
  await productsStore.update(id, { status: STATUS_APPROVED })

  await productsStore.fetchAll()
}
async function declinedImage(id: number) {
  await productsStore.update(id, { status: STATUS_REJECTED })

  await productsStore.fetchAll()
}
</script>