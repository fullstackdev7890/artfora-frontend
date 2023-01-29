<template>
  <div class="gallery">
    <div
      v-for="column in cols"
      class="gallery-column"
    >
      <div
        v-for="image in column"
        class="gallery-item"
      >
        <div class="gallery-item-image-container">
          <img :src="image.url">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { onMounted } from 'vue'
import { JUSTIFIED_GALLERY_VIEW_TYPE, SQUARE_GALLERY_VIEW_TYPE, DETAILS_GALLERY_VIEW_TYPE, GalleryColumn } from '~/types/gallery'

interface Props {
  cols: GalleryColumn[],
  viewType: string
}

const props = withDefaults(defineProps<Props>(), {
  cols: () => ([]),
})
</script>
