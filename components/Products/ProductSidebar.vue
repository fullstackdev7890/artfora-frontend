<template>
  <transition name="product-sidebar">
    <div class="product-sidebar">

      <div class="product-sidebar-background">
        <img v-if="props.product.user.background_image"
          :src="getImageUrl(props.product.user.background_image, ImageTemplate.FullSize)" alt="background-image">
      </div>

      <div class="product-sidebar-user">
        <img :src="getUserAvatar($props.product.user.avatar_image, ImageTemplate.SmallThumbnail)"
          class="product-sidebar-user-avatar" alt="user-avatar">
        <div class="product-sidebar-user-name">
          <h4>{{ props.product.user.username }}</h4>
          <p>{{ props.product.user.tagname }}</p>
        </div>
        <div class="product-sidebar-user-share">
          <share-icon class="share-icon" @click="linksModal.open()" />
        </div>
      </div>

      <div class="product-sidebar-info">
        <div class="product-sidebar-info-item">
          <h5>Title:</h5>
          <span>{{ props.product.title }}</span>
        </div>
        <div class="product-sidebar-info-item">
          <h5>Artist:</h5>
          <span>{{ props.product.author }}</span>
        </div>
        <div class="product-sidebar-info-item">
          <h5>Price:</h5>
          <span>€{{ formattedNumber(props.product.price_in_euro) }}</span>
        </div>
        <div class="product-sidebar-info-item">
          <h5>Size (L/W/D):</h5>
          <span>{{ formattedNumber(props.product.height) }}/{{ formattedNumber(props.product.width) }}/{{
            formattedNumber(props.product.depth) }} cm</span>
        </div>
        <!-- <div class="product-sidebar-info-item">
          <h5>Weight:</h5>
          <span>{{ props.product.weight }}kg</span>
        </div> -->
      </div>
      <div class="product-sidebar-info-item">
        <h5>Shipping:</h5>
        <span></span>
      </div>
      <div class="product-sidebar-info-item">
        Description:
        <p>{{ props.product.description }}</p>
      </div>
      <div class="product-sidebar-buy-button">
        <button class="button full-width" @click="saveProductToCart">
          <span>BUY</span>
        </button>
      </div>
      <div class="product-sidebar-bottom-buttons-wrapper">
        <button class="button full-width" @click="contactModal.open()">
          <span>CONTACT</span>
        </button>
        <button class="button full-width" @click="commissionWorkModal.open()">
          <span>COMMISSION OPEN</span>
        </button>
      </div>
      <links-modal ref="linksModal" :morelinks="props.product.user.more_external_link || []"
        :links="props.product.user.external_link" />

      <commission-work-modal ref="commissionWorkModal" :user-id="props.product.user.id" />

      <contact-modal ref="contactModal" />
    </div>
  </transition>
</template>

<script setup lang="ts">
import nuxtStorage from 'nuxt-storage';
import { Product } from '~/types/products'
import { ImageTemplate } from '~/types/constants'
import ShareIcon from '~/assets/svg/share.svg'
import LinksModal from '~/components/Modals/LinksModal.vue'
import CommissionWorkModal from '~/components/Modals/CommissionWorkModal.vue'
import ContactModal from '~/components/Modals/ContactModal.vue'
import useMedia from '~/composable/media'

interface Props {
  product: Product
}
const props = withDefaults(defineProps<Props>(), {
  product: {
    id: 1,
    title: '',
    author: '',
    media: {
      id: 1,
      deleted_at: null,
      created_at: '',
      link: '',
      name: ''
    },
    user: {
      id: 1,
      username: '',
      tagname: '',
      background_image: '',
      morelinks: [],
      media: {
        id: 1,
        deleted_at: null,
        created_at: '',
        link: '',
        name: ''
      }
    }
  }

})
function saveProductToCart() {
  const artforaCarts = nuxtStorage.localStorage.getData("artfora_carts") || []
  nuxtStorage.localStorage.setData('artfora_carts', [...artforaCarts, { id: props.product.id, title: props.product.title, artist: props.product.artist, price: props.product.price, description: props.product.description }])
}
const linksModal = ref<InstanceType<typeof LinksModal>>(null)
const commissionWorkModal = ref<InstanceType<typeof CommissionWorkModal>>(null)
const contactModal = ref<InstanceType<typeof ContactModal>>(null)
const { getUserAvatar, getImageUrl } = useMedia()

function formattedNumber(amount: number) {
  const formattedNumber = amount.toLocaleString('de-DE', {})
  return formattedNumber
}
</script>