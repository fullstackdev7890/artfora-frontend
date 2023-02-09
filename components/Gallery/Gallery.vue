<template>
  <div class="gallery">
    <div
      v-for="column in cols"
      class="col-20 col-large-25 col-laptop-33 col-tab-50 col-mobile-100"
    >
      <nuxt-link
        v-for="image in column"
        :to="`/products/${image.id}`"
        class="gallery-item"
      >
        <div
            class="gallery-item-image-container"
            :class="{
              'gallery-item-image-container-square': props.viewType === SQUARE_GALLERY_VIEW_TYPE,
              'gallery-item-image-container-details': props.viewType === DETAILS_GALLERY_VIEW_TYPE
            }"
        >
          <div class="gallery-item-image-container-info">
            <h4>"{{ image.title }}"</h4>
            <p>by {{ image.author }}</p>
            <p>Uploaded by {{ image.user.tagname }}</p>
          </div>

          <user-details
            v-if="props.viewType === DETAILS_GALLERY_VIEW_TYPE"
            :author="image.author"
            :author-tag="image.user.tagname"
            :author-avatar="image.user.media.link"
          />

          <img :src="image.media.link" :alt="image.title">
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { JUSTIFIED_GALLERY_VIEW_TYPE, SQUARE_GALLERY_VIEW_TYPE, DETAILS_GALLERY_VIEW_TYPE, Product } from '~/types/products'
import UserDetails from '~/components/Gallery/userDetails.vue'

interface Props {
  cols: Product[],
  viewType: string
}

const props = withDefaults(defineProps<Props>(), {
  cols: () => ([]),
})
</script>
