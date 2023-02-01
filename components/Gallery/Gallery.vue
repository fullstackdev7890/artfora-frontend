<template>
  <div class="gallery">
    <div
      v-for="column in cols"
      class="col-20 col-large-25 col-laptop-33 col-tab-50 col-mobile-100"
    >
      <div
        v-for="image in column"
        class="gallery-item"
      >
        <div
            class="gallery-item-image-container"
            :class="{
              'gallery-square': props.viewType === SQUARE_GALLERY_VIEW_TYPE,
              'gallery-details': props.viewType === DETAILS_GALLERY_VIEW_TYPE
            }"
        >
          <div class="gallery-item-image-container-info">
            <h4>"{{ image.name }}"</h4>
            <p>by {{ image.author }}</p>
            <p>Uploaded by {{ image.author }}</p>
          </div>
          <user-details
            v-if="props.viewType === DETAILS_GALLERY_VIEW_TYPE"
            :author="image.author"
            :author-tag="image.author_tag"
            :author-avatar="image.author_avatar"
          />
          <img :src="image.url" :alt="image.name">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { onMounted } from 'vue'
import { JUSTIFIED_GALLERY_VIEW_TYPE, SQUARE_GALLERY_VIEW_TYPE, DETAILS_GALLERY_VIEW_TYPE, GalleryColumn } from '~/types/gallery'
import UserDetails from '~/components/Gallery/userDetails.vue'

interface Props {
  cols: GalleryColumn[],
  viewType: string
}

const props = withDefaults(defineProps<Props>(), {
  cols: () => ([]),
})
</script>
