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

          <div
            v-if="image.status === STATUS_PENDING && getUserRole === ROLE_ADMIN"
            class="gallery-item-image-container-info gallery-item-image-container-admin"
          >
            <h4>PENDING</h4>
            <p>"{{ image.title }}"</p>
            <a href="#" class="link">see details</a>
            <button class="full-width button" @click.prevent="approveImage(image.id)">APPROVE</button>
            <button class="full-width button" @click.prevent="declinedImage(image.id)">DECLINED</button>
          </div>

          <user-details
            v-if="props.viewType === DETAILS_GALLERY_VIEW_TYPE"
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
import { defineProps} from 'vue'
import { SQUARE_GALLERY_VIEW_TYPE, DETAILS_GALLERY_VIEW_TYPE, Product } from '~/types/products'
import {ROLE_ADMIN, STATUS_APPROVED, STATUS_PENDING, STATUS_REJECTED} from '~/types/constants'
import { useUserStore } from '~/store/user'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '~/store/products'
import UserDetails from '~/components/Gallery/userDetails.vue'
import useMedia from '~/composable/media'

interface Props {
  cols: Product[],
  viewType: string
}

const props = withDefaults(defineProps<Props>(), {
  cols: () => ([]),
})
const { getImageUrl } = useMedia()
const userStore = useUserStore()
const productsStore = useProductsStore()
const { getUserRole } = storeToRefs(userStore)

const approveImage = async (id) => {
  await productsStore.update(id, { status: STATUS_APPROVED })

  await productsStore.fetchAll({ status: STATUS_PENDING })
}
const declinedImage = async (id) => {
  await productsStore.update(id, { status: STATUS_REJECTED })

  await productsStore.fetchAll({ status: STATUS_PENDING })
}

</script>
