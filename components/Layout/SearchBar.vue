<template>
  <div class="search-bar">
    <div
      class="search-bar-content"
      :class="{ 'search-bar-content-expanded': isExpanded }"
    >
      <input
        v-show="isExpanded"
        v-model="search"
        @input="findProducts"
        class="search-bar-content-input"
        type="text"
      />
      <div
        :class="{'search-bar-content-icon-expanded' : isExpanded}"
        @click="toggleExpanded"
        class="search-bar-content-icon"
      >
        <search-icon class="search-icon" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SearchIcon from '~/assets/svg/search.svg'
import { useProductsStore } from '~/store/products'

const isExpanded = ref(false)
const products = useProductsStore()
const search = ref('')
let timer: ReturnType<typeof setTimeout> | null = null

const findProducts = () => {

  if (timer) {
    clearTimeout(timer)
  }

  timer = setTimeout(() => {

    if (search.value.length < 3) {
      products.updateFilter({ query: null })
      products.fetchAll()
      return
    }

    products.updateFilter({ query: search.value })
    products.fetchAll()

  }, 1000)
}

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value

  if (!isExpanded.value) {
    search.value = ''
    products.updateFilter({ query: null })
    products.fetchAll()
  }
}

</script>

