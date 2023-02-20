<template>
  <div class="gallery-item-image-container-details-user">
  <img :src="getUserAvatar($props.authorAvatar)" :alt="author">
  <div class="gallery-item-image-container-details-user-name">
    <h3>{{ author }}</h3>
    <p>{{ authorTag }}</p>
  </div>
</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import useMedia from '~/composable/media'

interface Props {
  author: string
  authorTag: string
  authorAvatar: string | null
}

const props = withDefaults(defineProps<Props>(), {
  author: '',
  authorTag: '',
  authorAvatar: '',
})
const { getUserAvatar } = useMedia()
</script>