<template>
  <div class="categories">
    <div class="categories-parent">
      <a
          href="#"
          class="categories-parent-item"
          v-for="(category, index) in categories"
          :class="{'categories-parent-item-active': activeCategory === index}"
          @click="choiceCategory(index)"
      >
        {{ category.title }}
      </a>
    </div>
    <div class="categories-children">
      <label
          class="categories-children-item"
          v-for="item in subCategories"
          :class="{'categories-children-item-active': checkSubCategories.some((el) => el === item.title)}"
          :for="item.title"
      >
        {{ item.title }}
        <input
            type="checkbox"
            :id="item.title"
            :value="item.title"
            v-model="checkSubCategories"
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