<template>
  <div class="search-bar">
    <input
        v-show="isExpanded"
        class="search-bar-input"
        :class="{ 'search-bar-expanded': isExpanded }"
        type="text"
    />
      <div
          class="search-bar-icon"
          :class="{'search-bar-icon-expanded' : isExpanded}"
          @click="toggleExpanded"
      >
        <search-icon class="search-icon" />
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SearchIcon from '~/assets/svg/search.svg'

const isExpanded = ref(false)

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}
</script>
