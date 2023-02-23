<template>
  <div class="gallery">
    <div
      v-for="column in galleryImages"
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
              'gallery-item-image-container-square': galleryViewType === SQUARE_GALLERY_VIEW_TYPE,
              'gallery-item-image-container-details': galleryViewType === DETAILS_GALLERY_VIEW_TYPE
            }"
        >

          <product-info :product="image" />

          <user-details
            v-if="galleryViewType === DETAILS_GALLERY_VIEW_TYPE"
            :author="image.author"
            :author-tag="image.user.tagname"
            :author-avatar="image.user.avatar_image"
          />

          <img :src="getImageUrl(image.media[0])" :alt="image.title">
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  SQUARE_GALLERY_VIEW_TYPE,
  DETAILS_GALLERY_VIEW_TYPE,
  MOBILE_WIDTH,
  TABLET_WIDTH, LAPTOP_WIDTH, LARGE_WIDTH, JUSTIFIED_GALLERY_VIEW_TYPE
} from '~/types/products'
import { onMounted, onUnmounted, watch } from 'vue'
import { Product } from '~/types/products'
import { ref } from '@vue/reactivity'
import UserDetails from '~/components/Gallery/UserDetails.vue'
import useMedia from '~/composable/media'
import ProductInfo from "~/components/Gallery/ProductInfo.vue";

const { getImageUrl } = useMedia()
const galleryImages = ref([])
const galleryViewType = ref(JUSTIFIED_GALLERY_VIEW_TYPE)

interface Props {
  items: Product[]
}

const props = withDefaults(defineProps<Props>(), {
  items: () => []
})

watch(() => props.items, (newItems) => {
  sortImagesByColumns(newItems)
})

onMounted(async () => {
  if (process.client) {
    sortImagesByColumns(props.items)

    window.addEventListener('resize', () => sortImagesByColumns(props.items))
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', () => sortImagesByColumns(props.items))
})

function getColumnsCount() {
  if (!process.client) {
    return 1
  }

  const columnsCounts = {
    [MOBILE_WIDTH]: 2,
    [TABLET_WIDTH]: 3,
    [LAPTOP_WIDTH]: 4,
    [LARGE_WIDTH]: 5
  }

  return Object.entries(columnsCounts)
    .reduce((result, [size, columns]) => window.innerWidth > size ? columns : result, 5)
}

function sortImagesByColumns (images: Product[]) {
  const columnsCount = getColumnsCount()

  galleryImages.value = Array(columnsCount).fill().map(() => [])

  let currentColumn = 0

  images.forEach((item: Product) => {

    galleryImages.value[currentColumn].push(item)

    currentColumn++

    if (currentColumn >= galleryImages.value.length) {
      currentColumn = 0
    }
  })
}

</script>
