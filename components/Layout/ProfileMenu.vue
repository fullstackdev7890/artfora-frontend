<template>
  <div class="profile-menu">
    <div v-if="isAuthorized && (can_add_product || userStore.role_id === 1)" @click="openCartModal"
      @openCheckoutModal="openCheckoutModal" class="artfora-cart">
      <cart-icon class="cart-icon" />
      <div class="cart-badge" v-if="carts.length > 0">{{ carts.length }}</div>
    </div>

    <div v-if="isAuthorized && (can_add_product || userStore.role_id === 1)" @click="emit('openAddProductModal')"
      class="new-product">
      <plus-icon class="plus-icon" />
    </div>
    <div @click="menuDropdownRef?.open()" class="icon-button">
      <img :src="getUserAvatar(userAvatar, ImageTemplate.SmallThumbnail)" alt="user_avatar">
    </div>

    <ui-kit-dropdown title="Menu" ref="menuDropdownRef">
      <div v-if="isAuthorized" class="ui-kit-dropdown-content-item">
        <span @click="openSetUpAccountModal" class="ui-kit-dropdown-content-item-btn">My Settings</span>
      </div>

      <!-- <div v-if="isAuthorized" class="ui-kit-dropdown-content-item">
        <span
          @click="openStartSellingModal"
          class="ui-kit-dropdown-content-item-btn"
        >Start selling</span>
      </div> -->

      <div v-if="!isAuthorized" class="ui-kit-dropdown-content-item">
        <span @click="openLogInModal" class="ui-kit-dropdown-content-item-btn">Log in/Sign up</span>
      </div>

      <div class="ui-kit-dropdown-content-item">
        <span @click="openSettingsGallery" class="ui-kit-dropdown-content-item-btn">Gallery settings</span>
      </div>
      <div class="ui-kit-dropdown-content-item">
        <span @click="openAboutArtforaModal" class="ui-kit-dropdown-content-item-btn">About ARTfora</span>
      </div>
      <div class="ui-kit-dropdown-content-item">
        <span @click="openFaqModal" class="ui-kit-dropdown-content-item-btn">FAQ</span>
      </div>

      <div class="ui-kit-dropdown-content-item">
        <span @click="openContactUsModal" class="ui-kit-dropdown-content-item-btn">Contact us</span>
      </div>

      <div v-if="isAuthorized" class="ui-kit-dropdown-content-item">
        <span class="ui-kit-dropdown-content-item-btn" @click="logout">Log out</span>
      </div>
    </ui-kit-dropdown>

  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useAuthStore } from '~/store/auth'
import { useUserStore } from '~/store/user'
import { useCartStore } from '~~/store/cart'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '~/store/products'
import { useAsyncData } from '#app'
import { navigateTo } from '#imports'
import useMedia from '~/composable/media'
import UiKitDropdown from '~/components/UiKit/UiKitDropdown.vue'
import PlusIcon from '~/assets/svg/plus.svg'
import CartIcon from "~/assets/svg/icon_cart.svg"
import { ImageTemplate, ROLE_ADMIN } from '~/types/constants'

const emit = defineEmits(['openCheckoutModal', 'openCartModal', 'openAddProductModal', 'openLogInModal', 'openSignUpModal', 'openContactUsModal', 'openGallerySettingsModal', 'openFaqModal', 'openStartSellingModal', 'openSetUpAccountModal', 'openAboutArtforaModal'])

const menuDropdownRef = ref<InstanceType<typeof UiKitDropdown>>()

const authStore = useAuthStore()
const userStore = useUserStore()
const cartStore = useCartStore()
const { isAuthorized } = storeToRefs(authStore)
const { userAvatar } = storeToRefs(userStore)
const { getUserAvatar } = useMedia()
const { getUserRole } = storeToRefs(userStore)
const { can_add_product } = storeToRefs(userStore)
const productStore = useProductsStore()
const { carts, totalProductsPrice, totalShippingPrice } = storeToRefs(cartStore)

function logout() {
  authStore.logout()
  userStore.clearProfile()
  menuDropdownRef.value && menuDropdownRef.value.close()
  navigateTo('/')
}
function openCheckoutModal() {
  menuDropdownRef.value && menuDropdownRef.value.close()
  emit('openCheckoutModal')
}
function openCartModal() {
  menuDropdownRef.value && menuDropdownRef.value.close()
  emit('openCartModal')
}
function openSettingsGallery() {
  menuDropdownRef.value && menuDropdownRef.value.close()
  emit('openGallerySettingsModal')
}

function openStartSellingModal() {
  menuDropdownRef.value && menuDropdownRef.value.close()
  emit('openStartSellingModal')
}

function openSetUpAccountModal() {
  menuDropdownRef.value && menuDropdownRef.value.close()
  emit('openSetUpAccountModal')
}
function openAboutArtforaModal() {
  menuDropdownRef.value && menuDropdownRef.value.close()
  emit('openAboutArtforaModal')
}
function openFaqModal() {
  menuDropdownRef.value && menuDropdownRef.value.close()
  emit('openFaqModal')
}

function openLogInModal() {
  menuDropdownRef.value && menuDropdownRef.value.close()
  emit('openLogInModal')
}

function openSignUpModal() {
  menuDropdownRef.value && menuDropdownRef.value.close()
  emit('openSignUpModal')
}

function openContactUsModal() {
  menuDropdownRef.value && menuDropdownRef.value.close()
  emit('openContactUsModal')
}

onBeforeMount(() => {
  if (isAuthorized.value) {
    useAsyncData('fetch-profile', async () => {
      await userStore.fetch()

      if (getUserRole.value === ROLE_ADMIN) {
        await productStore.getPendingCount()
      }
    })
  }
})
</script>
