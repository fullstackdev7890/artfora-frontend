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
        <div
            class="gallery-item-image-container"
            :class="{
              'square': props.viewType === SQUARE_GALLERY_VIEW_TYPE,
              'details': props.viewType === DETAILS_GALLERY_VIEW_TYPE
            }"
        >
          <user-details
              :author="image.author"
              :author-tag="image.author_tag"
              :author-avatar="image.author_avatar"
              v-if="props.viewType === DETAILS_GALLERY_VIEW_TYPE"
          />
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
import UserDetails from '~/components/Gallery/userDetails.vue';

interface Props {
  cols: GalleryColumn[],
  viewType: string
}

const props = withDefaults(defineProps<Props>(), {
  cols: () => ([]),
})
</script>
