<template>
  <div class="categories">

    <div class="categories-body">
      <a
          href="#"
          class="categories-body-item categories-body-item-parents"
          v-for="(category, index) in categories"
          :class="{'categories-body-item-active': activeCategory === index}"
          @click="choiceCategory(index)"
      >
        {{ category.title }}
      </a>
    </div>
    <div class="categories-body">
        <label
            class="categories-body-item categories-body-item-children"
            v-for="item in subCategories"
            :class="{'categories-body-item-active': checkSubCategories.some((el) => el === item.title)}"
            :for="item.title"
        >
        {{ item.title }}
        <input
            v-model="checkSubCategories"
            :id="item.title"
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