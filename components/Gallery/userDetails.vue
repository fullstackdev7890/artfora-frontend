<template>
  <div class="gallery-item-image-container-details-user">
  <img :src="userAvatar" :alt="author">
  <div class="gallery-item-image-container-details-user-name">
    <h3>{{ author }}</h3>
    <p>{{ authorTag }}</p>
  </div>
</div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import avatar from 'assets/images/logo.jpg'
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
const userAvatar = computed(() => props.authorAvatar ? getUserAvatar(props.imageInfo.authorAvatar) : avatar)
</script>