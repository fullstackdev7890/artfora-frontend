<template>
  <div class="gallery-details-user">
    <img :src="authorAvatar" :alt="author">
    <div class="gallery-details-user-name">
      <h3>{{ author }}</h3>
      <p>{{ authorTag }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface Props {
  author: string
  authorTag: string
  authorAvatar: string
}

const props = withDefaults(defineProps<Props>(), {
  author: '',
  authorTag: '',
  authorAvatar: '',
})
</script>