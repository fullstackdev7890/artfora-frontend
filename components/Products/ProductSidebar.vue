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
        <button class="button full-width" @click="saveProductToCart" :disabled="!isAuthorized">
          <span>BUY</span>
        </button>
        <div class="product-sidebar-error-handler">
          <span v-if="!isAuthorized" class="product-sidebar-buy-button-error-message">{{ error }}</span>

          <span class="product-sidebar-buy-button-error-link">Sign up or log in &nbsp;<span class="link"
              @click="openLogInModal">here</span></span>
        </div>
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
      <cart-modal ref='cartModalRef' @open-cart-modal="openCartModal" @open-checkout-modal="openCheckoutModal" />
      <checkout-modal ref='checkoutModalRef' @open-checkout-modal="openCheckoutModal" />
      <contact-modal ref="contactModal" />
      <log-in-modal
      ref="logInModalRef"
      @open-pre-sign-up-modal="openPreSignUpModal"
      @open-two-factor-auth-modal="twoFactorAuthModalRef.open()"
      @open-reset-password-modal="resetPasswordModalRef.open()"
    />
    <two-factor-auth-modal
      ref="twoFactorAuthModalRef"
      @open-log-in-modal="openLogInModal"
    />

    <reset-password-modal
      ref="resetPasswordModalRef"
      @open-sign-up-modal="openSignUpModal"
    />
    <pre-sign-up-modal
      ref="preSignUpModalRef"
      @open-sign-up-modal="openSignUpModal"
    />
    <sign-up-modal
      ref="signUpModalRef"
      @open-log-in-modal="openLogInModal"
    />
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
import LogInModal from '~/components/Modals/LogInModal.vue'
import  ModalsComponent from '~/components/Layout/ModalsComponent.vue';
import PreSignUpModal from '~/components/Modals/PreSignUpModal.vue'
import TwoFactorAuthModal from '~/components/Modals/TwoFactorAuthModal.vue'
import ResetPasswordModal from '~/components/Modals/ResetPasswordModal.vue'
import SignUpModal from '~/components/Modals/SignUpModal.vue'

import CartModal from '~/components/Modals/CartModal.vue'
import CheckoutModal from '../Modals/CheckoutModal.vue';
import useMedia from '~/composable/media'
import { useAuthStore } from '~~/store/auth';
import { storeToRefs } from 'pinia'

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
const authStore = useAuthStore()
const { isAwaitingTokenConfirmation } = storeToRefs(authStore)
const modalsRef=ref<InstanceType<typeof ModalsComponent>>(null)
const { isAuthorized } = storeToRefs(authStore)
const error = ref("You need to be logged in to buy.")
const linksModal = ref<InstanceType<typeof LinksModal>>(null)
const commissionWorkModal = ref<InstanceType<typeof CommissionWorkModal>>(null)
const contactModal = ref<InstanceType<typeof ContactModal>>(null)
const cartModalRef = ref<InstanceType<typeof CartModal>>(null)
const checkoutModalRef = ref<InstanceType<typeof CheckoutModal>>(null)
const logInModalRef = ref<InstanceType<typeof LogInModal>>(null)
const twoFactorAuthModalRef = ref<InstanceType<typeof TwoFactorAuthModal>>(null)
 const signUpModalRef = ref<InstanceType<typeof SignUpModal>>(null)

const resetPasswordModalRef = ref<InstanceType<typeof ResetPasswordModal>>(null)
const preSignUpModalRef = ref<InstanceType<typeof PreSignUpModal>>(null)

const { getUserAvatar, getImageUrl } = useMedia()

function formattedNumber(amount: number) {
  const formattedNumber = amount?.toLocaleString('de-DE', {})
  return formattedNumber
}
function openCheckoutModal() {
  checkoutModalRef.value.open()
}
function openCartModal() {
  cartModalRef.value.open()
}

function saveProductToCart() {
  if (isAuthorized.value) {

    // const artforaCarts = nuxtStorage.localStorage.getData("artfora_carts") || []
    // nuxtStorage.localStorage.setData('artfora_carts', [...artforaCarts, { id: props.product.id, title: props.product.title, artist: props.product.artist, price: props.product.price, description: props.product.description }])
    cartModalRef.value.open()
  }
}

function openLogInModal() {
  if (isAwaitingTokenConfirmation.value) {
    twoFactorAuthModalRef.value.open()
    return
  }

  logInModalRef.value.open()
}
function openPreSignUpModal() {
  preSignUpModalRef.value.open()
}

function openSignUpModal() {
  if (isAwaitingTokenConfirmation.value) {
    twoFactorAuthModalRef.value.open()
    return
  }
  signUpModalRef.value.open()
}
</script>