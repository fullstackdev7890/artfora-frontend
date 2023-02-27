<template>
  <div
    v-if="route.name === 'gallery-pending' && product.status === STATUS_PENDING && getUserRole === ROLE_ADMIN"
    class="gallery-item-image-container-info gallery-item-image-container-admin"
  >
    <h4>PENDING</h4>
    <p>"{{ product.title }}"</p>
    <a href="#" class="link">see details</a>

    <button
      class="button button-small"
      @click.prevent="moderateProduct(product.id, STATUS_APPROVED)"
    >APPROVE</button>

    <button
      class="button button-small"
      @click.prevent="moderateProduct(product.id, STATUS_REJECTED)"
    >DECLINE</button>
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
import { useRoute } from 'vue-router'

interface Props {
  product: Product
}
const props = defineProps<Props>()
const userStore = useUserStore()
const productsStore = useProductsStore()
const { getUserRole } = storeToRefs(userStore)
const route = useRoute()

async function moderateProduct(id: number, status: string) {
  await productsStore.update(id, { status: status })

  await productsStore.fetchAll()

  await productsStore.getPendingCount()
}
</script>