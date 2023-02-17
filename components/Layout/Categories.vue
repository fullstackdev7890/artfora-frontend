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
        Pending (2)
      </a>
      <a
        v-for="(category, index) in categories"
        :class="{'categories-body-item-active': activeCategory === index}"
        @click.prevent="choiceCategory(index)"
        href="#"
        class="categories-body-item categories-body-item-parents"
      >
        {{ category.title }}
      </a>
    </div>

    <div class="categories-body" v-if="subCategories">
      <label
        v-for="item in subCategories"
        :class="{'categories-body-item-active': checkSubCategories.some((el) => el === item.title)}"
        :for="item.title"
        class="categories-body-item categories-body-item-children"
      >
        {{ item.title }}
        <input
          :id="item.title"
          v-model="checkSubCategories"
          :value="item.title"
          type="checkbox"
        >
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCategoriesStore } from '~/store/categories'
import { storeToRefs } from "pinia"
import { useAsyncData } from "#app"
import {useUserStore} from "~/store/user";
import {useProductsStore} from "~/store/products";

const categoriesStore = useCategoriesStore()
const userStore = useUserStore()
const productStore = useProductsStore()
const { categories } = storeToRefs(categoriesStore)
const { getUserRole } = storeToRefs(userStore)
const activeCategory = ref(0)
const subCategories = computed(() => categories.value[activeCategory.value]?.children ?? null)
const checkSubCategories = ref([])

const choiceCategory = (index: number) => {
  activeCategory.value = index
  checkSubCategories.value = []

  if (index === -1) {
    productStore.fetchAll({ status: 'Pending' })
  }

  if (index >= 0) {
    // const category = checkSubCategories.value.length > 0 ? checkSubCategories.value.join(',') : activeCategory.value
    productStore.fetchAll({status: 'Approved'})
  }

}

useAsyncData('categories', async () => {
  await categoriesStore.fetch()
})
</script>