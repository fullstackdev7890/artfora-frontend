<template>
  <transition name="product-sidebar">
    <div class="product-sidebar">

      <div class="product-sidebar-background">
        <img v-if="props.product.user.background_image"
          :src="getImageUrl(props.product.user.background_image, ImageTemplate.FullSize)" alt="background-image">
      </div>

      <div class="product-sidebar-user">
        <img :src="getUserAvatar($props.product?.user.avatar_image, ImageTemplate.SmallThumbnail)"
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
        <button class="button full-width" v-if="!isShowGotoCartButton" @click="saveProductToCart"
          :disabled="!isAuthorized">
          <span>BUY</span>
        </button>
        <button v-if="isShowGotoCartButton" class="button full-width" @click="gotoCart" :disabled="!isAuthorized">
          <span>Go to cart</span>
        </button>
        <div class="product-sidebar-error-handler">
          <span v-if="!isAuthorized" class="product-sidebar-buy-button-error-message">{{ error }}</span>

          <span v-if="!isAuthorized" class="product-sidebar-buy-button-error-link"><span class="link"
              @click="openSignUpModal">Sign up</span> &nbsp; or &nbsp;<span class="link" @click="openLogInModal">Log
              in</span></span>
        </div>
      </div>
      <div class="product-sidebar-bottom-buttons-wrapper">
        <button class="button full-width" @click="contactModal?.open()">
          <span>CONTACT</span>
        </button>
        <button class="button full-width" @click="commissionWorkModal?.open()">
          <span>COMMISSION OPEN</span>
        </button>
      </div>
      <links-modal ref="linksModal" :morelinks="props.product.user.more_external_link || []"
        :links="props.product.user.external_link" />

      <commission-work-modal ref="commissionWorkModal" :user-id="props.product.user.id" />
      <checkout-modal ref='checkoutModalRef' @open-checkout-modal="openCheckoutModal" />
      <contact-modal ref="contactModal" />
      <log-in-modal ref="logInModalRef" @open-pre-sign-up-modal="openPreSignUpModal"
        @open-two-factor-auth-modal="twoFactorAuthModalRef?.open()"
        @open-reset-password-modal="resetPasswordModalRef?.open()" />
      <two-factor-auth-modal ref="twoFactorAuthModalRef" @open-log-in-modal="openLogInModal" />

      <reset-password-modal ref="resetPasswordModalRef" @open-sign-up-modal="openSignUpModal" />
      <pre-sign-up-modal ref="preSignUpModalRef" @open-sign-up-modal="openSignUpModal" />
      <sign-up-modal ref="signUpModalRef" @open-log-in-modal="openLogInModal" />
      <cart-modal ref='cartModalRef' @open-cart-modal="openCartModal" @open-checkout-modal="openCheckoutModal" />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCartStore } from '~~/store/cart'
import { useAuthStore } from '~~/store/auth';

import ShareIcon from '~/assets/svg/share.svg'

import { ImageTemplate } from '~/types/constants'
import { Product, CartType } from '~/types/products'

import useMedia from '~/composable/media'

import LinksModal from '~/components/Modals/LinksModal.vue'
import LogInModal from '~/components/Modals/LogInModal.vue'
import SignUpModal from '~/components/Modals/SignUpModal.vue'
import ContactModal from '~/components/Modals/ContactModal.vue'
import PreSignUpModal from '~/components/Modals/PreSignUpModal.vue'
import TwoFactorAuthModal from '~/components/Modals/TwoFactorAuthModal.vue'
import ResetPasswordModal from '~/components/Modals/ResetPasswordModal.vue'
import CommissionWorkModal from '~/components/Modals/CommissionWorkModal.vue'
import CartModal from '~/components/Modals/CartModal.vue'
import CheckoutModal from '../Modals/CheckoutModal.vue';

interface Props {
  product: Product,
  newItem: CartType

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
const cartStore = useCartStore()
const { isAwaitingTokenConfirmation } = storeToRefs(authStore)
const { isAuthorized } = storeToRefs(authStore)
const error = ref("You need to be logged in to buy.")
const linksModal = ref<InstanceType<typeof LinksModal>>()
const commissionWorkModal = ref<InstanceType<typeof CommissionWorkModal>>()
const contactModal = ref<InstanceType<typeof ContactModal>>()
const cartModalRef = ref<InstanceType<typeof CartModal>>()
const checkoutModalRef = ref<InstanceType<typeof CheckoutModal>>()
const logInModalRef = ref<InstanceType<typeof LogInModal>>()
const twoFactorAuthModalRef = ref<InstanceType<typeof TwoFactorAuthModal>>()
const signUpModalRef = ref<InstanceType<typeof SignUpModal>>()

const resetPasswordModalRef = ref<InstanceType<typeof ResetPasswordModal>>()
const preSignUpModalRef = ref<InstanceType<typeof PreSignUpModal>>()

const isShowGotoCartButton = ref(false)

const { getUserAvatar, getImageUrl } = useMedia()

function formattedNumber(amount: number) {
  const formattedNumber = amount?.toLocaleString('de-DE', {})
  return formattedNumber
}

function openCheckoutModal() {
  checkoutModalRef.value && checkoutModalRef.value.open()
}

function openCartModal() {
  cartModalRef.value && cartModalRef.value.open()
}
async function saveProductToCart() {
  if (isAuthorized.value) {
    isShowGotoCartButton.value = true

    const newItem = {
      id: props.product?.id,
      title: props.product?.title,
      artist: props.product?.author,
      price_in_euro: props.product?.price_in_euro,
      description: props.product?.description,
      media: props.product?.media,
      height: props.product?.height,
      width: props.product?.width,
      depth: props.product?.depth,
      shippingPrice: 0,
      quantity: 1
    };
    await cartStore.addCart(newItem as CartType)

  }
}
function gotoCart() {
  if (isAuthorized.value) {
    cartModalRef.value && cartModalRef.value.open()

    // const artforaCarts = nuxtStorage.localStorage.getData("artfora_carts") || []
    // nuxtStorage.localStorage.setData('artfora_carts', [...artforaCarts, { id: props.product.id, title: props.product.title, artist: props.product.artist, price: props.product.price, description: props.product.description }])
  }
}

function openLogInModal() {
  if (isAwaitingTokenConfirmation.value) {
    twoFactorAuthModalRef.value && twoFactorAuthModalRef.value.open()
    return
  }

  logInModalRef.value && logInModalRef.value.open()
}
function openPreSignUpModal() {
  preSignUpModalRef.value && preSignUpModalRef.value.open()
}

function openSignUpModal() {
  if (isAwaitingTokenConfirmation.value) {
    twoFactorAuthModalRef.value && twoFactorAuthModalRef.value.open()
    return
  }
  signUpModalRef.value && signUpModalRef.value.open()
}
</script>