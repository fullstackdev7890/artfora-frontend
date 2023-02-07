<template>
  <div class="categories">

    <div class="categories-body">
      <a
        v-for="(category, index) in categories"
        :class="{'categories-body-item-active': activeCategory === index}"
        @click="choiceCategory(index)"
        href="#"
        class="categories-body-item categories-body-item-parents"
      >
        {{ category.title }}
      </a>
    </div>

    <div class="categories-body">
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
import { ref } from 'vue'
import { useCategoriesStore } from '~/store/categories'

const { categories } = useCategoriesStore()
const activeCategory = ref(0)
const subCategories = computed(() => categories[activeCategory.value].children)
const checkSubCategories = ref([])

const choiceCategory = (index: number) => {
  activeCategory.value = index
  checkSubCategories.value = []
}

</script>