<template>
  <div class="categories">

    <div class="categories-body">
      <nuxt-link
        v-if="user.role_id === ROLE_USER"
        :class="{'categories-body-item-active': $route.path === '/gallery/my-images' }"
        to="/gallery/my-images"
        class="categories-body-item categories-body-item-parents"
      >
        My images
      </nuxt-link>
      <nuxt-link
        v-if="user.role_id === ROLE_ADMIN"
        :class="{'categories-body-item-active': $route.path === '/gallery/pending'}"
        to="/gallery/pending"
        class="categories-body-item categories-body-item-parents"
      >
        Pending ({{  }})
      </nuxt-link>
      <nuxt-link
        :class="{'categories-body-item-active': $route.path === '/'}"
        class="categories-body-item categories-body-item-parents"
        to="/"
      >
        All
      </nuxt-link>
      <nuxt-link
        v-for="(category) in items"
        @click="clearSubCategories"
        :to="`/gallery/${category.id}`"
        :class="{'categories-body-item-active': $route.path === `/gallery/${category.id}`}"
        class="categories-body-item categories-body-item-parents"
      >
        {{ category.title }}
      </nuxt-link>
    </div>

    <div class="categories-body" v-if="subCategories">
      <label
        v-for="item in subCategories"
        :class="{'categories-body-item-active': selectSubCategories.some((el) => el === item.id)}"
        :for="item.title"
        class="categories-body-item categories-body-item-children"
      >
        {{ item.title }}
        <input
          :id="item.title"
          v-model="selectSubCategories"
          @change="selectSubCategory(item.id)"
          :value="item.id"
          type="checkbox"
        >
      </label>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCategoriesStore } from '~/store/categories'
import { storeToRefs } from 'pinia'
import { useAsyncData } from '#app'
import { useUserStore } from '~/store/user'
import { useProductsStore } from '~/store/products'
import { STATUS_APPROVED, STATUS_PENDING, ROLE_ADMIN, ROLE_USER } from '~/types/constants'

const categoriesStore = useCategoriesStore()
const user = useUserStore()
const products = useProductsStore()
const { items } = storeToRefs(categoriesStore)
const route = useRoute()
const selectSubCategories = ref([])
const subCategories = computed(() => items.value.find(category => category.id === Number(route.params.id))?.children ?? null)
function clearSubCategories() {
  selectSubCategories.value = []
}
function selectSubCategory() {
  products.updateFilter({ categories: selectSubCategories.value })
  products.fetchAll()
}

await useAsyncData('categories', async () => {
  await categoriesStore.fetch()
})

</script>