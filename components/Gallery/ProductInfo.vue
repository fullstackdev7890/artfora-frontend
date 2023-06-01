<template>
  <div
    v-if="route.name === 'gallery-pending' && product.status === STATUS_PENDING && getUserRole === ROLE_ADMIN"
    class="gallery-item-image-container-info gallery-item-image-container-admin"
  >
    <h4>{{ product.title }}</h4>
    <div>
      by 
      <nuxt-link
        :to="`/gallery/author/${product.author}`"
        @click="() => byAuthor(product.author)"
        class="gallery-item-image-container-info-link"
      >
        {{ product.author }}
      </nuxt-link>
    </div>
    <div>
      Uploaded by 
      <nuxt-link
        :to="`/gallery/user/${product.user.username}`"
        class="gallery-item-image-container-info-link"
      >
        {{ product.user.username }}
      </nuxt-link>
    </div>
    <div>
      {{ [
        '',
        'For all users, does not contain explicit material',
        'Can contain nudity but only for educational use',
        'Can contain nudity and erotic material',
        'Can contain pornographic or other explicit material'
        ][product.visibility_level]
      }}
    </div>
    <div class="gallery-item-image-container-admin-buttons">
      <button
        :disabled="store.pendingRequestsCount"
        class="button"
        @click.prevent="moderateProduct(product.id, STATUS_APPROVED)"
      ><span>APPROVE</span></button>

      <button
        :disabled="store.pendingRequestsCount"
        class="button"
        @click.prevent="moderateProduct(product.id, STATUS_REJECTED)"
      ><span>DECLINE</span></button>

      <button
        class="button"
      ><span>DETAILS</span></button>
    </div>
  </div>

  <div
    v-else
    class="gallery-item-image-container-info"
  >
    <h4>{{ product.title }}</h4>
    <div>
      by 
      <nuxt-link
        @click="() => byAuthor(product.author)"
        :to="`/gallery/author/${product.author}`"
        class="gallery-item-image-container-info-link"
      >
        {{ product.author }}
      </nuxt-link>
    </div>
    <div>
      Uploaded by 
      <nuxt-link
        :to="`/gallery/user/${product.user.username}`"
        class="gallery-item-image-container-info-link"
      >
        {{ product.user.username }}
      </nuxt-link>
    </div>
    <p></p>
  </div>
</template>

<script setup lang="ts">
import { Product } from '~/types/products'
import { ROLE_ADMIN, STATUS_APPROVED, STATUS_PENDING, STATUS_REJECTED } from '~/types/constants'
import { useUserStore } from '~/store/user'
import { useProductsStore } from '~/store/products'
import { useStore } from '~/store'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useCategoriesStore } from '~/store/categories'

interface Props {
  product: Product
}
const props = defineProps<Props>()
const store = useStore()
const userStore = useUserStore()
const productsStore = useProductsStore()
const { getUserRole } = storeToRefs(userStore)
const route = useRoute()
const categoriesStore = useCategoriesStore()

async function byAuthor(author: string) {
  await categoriesStore.categoriesByAuthor(author);
}

async function moderateProduct(id: number, status: string) {
  await productsStore.update(id, { status: status })

  await productsStore.fetchAll()

  await productsStore.getPendingCount()
}
</script>