<template>
  <div class="search-bar">
    <div
      class="search-bar-content"
      :class="{ 'search-bar-content-expanded': isExpanded }"
    >
      <input
        v-show="isExpanded"
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

const isExpanded = ref(false)

const toggleExpanded = () => isExpanded.value = !isExpanded.value
</script>
