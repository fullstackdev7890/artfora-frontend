<template>
  <div class="categories">

    <div class="categories-body">
      <a
        v-if="getUserRole === 2"
        @click.prevent=choiceCategory(-2)
        :class="{'categories-body-item-active': activeCategory === -2}"
        href="#"
        class="categories-body-item categories-body-item-parents"
      >
        My images
      </a>
      <a
        v-if="getUserRole === 1"
        @click.prevent=choiceCategory(-1)
        :class="{'categories-body-item-active': activeCategory === -1}"
        href="#"
        class="categories-body-item categories-body-item-parents"
      >
        Pending ({{ pendingCount }})
      </a>
      <a
        v-for="(category) in categories"
        :class="{'categories-body-item-active': activeCategory === category.id}"
        @click.prevent="choiceCategory(category.id)"
        href="#"
        class="categories-body-item categories-body-item-parents"
      >
        {{ category.title }}
      </a>
    </div>

    <div class="categories-body" v-if="subCategories">
      <label
        v-for="item in subCategories"
        :class="{'categories-body-item-active': checkSubCategories.some((el) => el === item.id)}"
        :for="item.title"
        class="categories-body-item categories-body-item-children"
      >
        {{ item.title }}
        <input
          :id="item.title"
          v-model="checkSubCategories"
          @change="choiceSubCategories(item.id)"
          :value="item.id"
          type="checkbox"
        >
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useCategoriesStore } from '~/store/categories'
import { storeToRefs } from 'pinia'
import { useAsyncData } from '#app'
import { useUserStore } from '~/store/user'
import { useProductsStore } from '~/store/products'
import { STATUS_APPROVED, STATUS_PENDING } from '~/types/constants'

const categoriesStore = useCategoriesStore()
const userStore = useUserStore()
const productStore = useProductsStore()
const { categories } = storeToRefs(categoriesStore)
const { getUserRole, getUserId } = storeToRefs(userStore)
const activeCategory = ref(1)
const subCategories = computed(() => categories.value.find(el => el.id === activeCategory.value)?.children ?? null)
const checkSubCategories = ref([])
const pendingCount = ref(0)

const choiceCategory = (index: number) => {
  activeCategory.value = index
  checkSubCategories.value = []

  if (index === -2) {
    productStore.fetchAll({ user_id: getUserId.value })
  }

  if (index === -1) {
    productStore.fetchAll({ status: STATUS_PENDING })
  }

  if (index === 1) {
    productStore.fetchAll({ status: STATUS_APPROVED })
  }

  if (index > 1) {
    const category_id = checkSubCategories.value.length > 0 ? checkSubCategories.value.join(',') : activeCategory.value
    productStore.fetchAll({ category_id, status: STATUS_APPROVED })
  }

}
onMounted(async () => {
  await productStore.fetchAll({ status: STATUS_APPROVED })

  pendingCount.value = await productStore.pendingCount()
})

const choiceSubCategories = () => {
  productStore.filterSubCategories(checkSubCategories.value, activeCategory.value)
}

await useAsyncData('categories', async () => {
  await categoriesStore.fetch()
})

</script>