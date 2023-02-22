<template>
  <div class="profile-menu">
    <div
      v-if="isAuthorized"
      @click="addProductModal.open()"
      class="new-product"
    >
      <plus-icon class="plus-icon"/>
    </div>
    <div
      @click="menuDropdownRef.open()"
      class="icon-button"
    >
      <img
        :src="getUserAvatar(userAvatar)"
        alt="user_avatar"
      >
    </div>

    <ui-kit-dropdown title="Menu" ref="menuDropdownRef">
      <div v-if="isAuthorized" class="ui-kit-dropdown-content-item">
        <span class="ui-kit-dropdown-content-item-btn">My Settings</span>
      </div>

      <div v-if="!isAuthorized" class="ui-kit-dropdown-content-item">
        <span @click="openSignUpModal()" class="ui-kit-dropdown-content-item-btn">Login/Sign up</span>
      </div>

      <div class="ui-kit-dropdown-content-item">
        <span class="ui-kit-dropdown-content-item-btn">Gallery settings</span>
      </div>

      <div class="ui-kit-dropdown-content-item">
        <span class="ui-kit-dropdown-content-item-btn">Contact us</span>
      </div>

      <div v-if="isAuthorized" class="ui-kit-dropdown-content-item">
        <span
          class="ui-kit-dropdown-content-item-btn"
          @click="logout"
        >Logout</span>
      </div>
    </ui-kit-dropdown>

    <add-product ref="addProductModal" />

    <sign-up-modal
      ref="signUpModalRef"
      @open-log-in-modal="openLogInModal"
    />

    <log-in-modal
      ref="logInModalRef"
      @open-sign-up-modal="openSignUpModal"
      @open-two-factor-auth-modal="openTwoFactorAuthModal"
      @open-reset-password-modal="openResetPasswordModal"
    />

    <two-factor-auth-modal ref="twoFactorAuthModalRef" />

    <reset-password-modal
      ref="resetPasswordModalRef"
      @open-sign-up-modal="openSignUpModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useAuthStore } from '~/store/auth'
import { useUserStore } from '~/store/user'
import { storeToRefs } from 'pinia'
import { useAsyncData } from '#app'
import useMedia from '~/composable/media'
import UiKitDropdown from '~/components/UiKit/UiKitDropdown.vue'
import PlusIcon from '~/assets/svg/plus.svg'
import SignUpModal from '~/components/Modals/SignUpModal.vue'
import AddProduct from '~/components/Modals/AddProduct.vue'
import UiKitModal from '~/components/UiKit/UiKitModal.vue'
import LogInModal from '~/components/Modals/LogInModal.vue'
import TwoFactorAuthModal from '~/components/Modals/TwoFactorAuthModal.vue'
import ResetPasswordModal from '~/components/Modals/ResetPasswordModal.vue'

const authStore = useAuthStore()
const userStore = useUserStore()
const { isAuthorized, isAwaitingTokenConfirmation } = storeToRefs(authStore)
const { userAvatar } = storeToRefs(userStore)
const { getUserAvatar } = useMedia()


const menuDropdownRef = ref<InstanceType<typeof UiKitDropdown>>(null)
const signUpModalRef = ref<InstanceType<typeof SignUpModal>>(null)
const addProductModal = ref<InstanceType<typeof UiKitModal>>(null)
const logInModalRef = ref<InstanceType<typeof LogInModal>>(null)
const twoFactorAuthModalRef = ref<InstanceType<typeof TwoFactorAuthModal>>(null)
const resetPasswordModalRef = ref<InstanceType<typeof ResetPasswordModal>>(null)

const router = useRouter()

router.beforeEach((to, from, next) => {
  closeSignUpModal()
  closeLogInModal()
  closeTwoFactorAuthModal()
  closeAddProductModal()
  closeResetPasswordModal()

  next()
})

function logout() {
  authStore.logout()
  menuDropdownRef.value.close()
}

function openTwoFactorAuthModal() {
  menuDropdownRef.value.close()
  twoFactorAuthModalRef.value.open()
}

function closeTwoFactorAuthModal() {
  twoFactorAuthModalRef.value.close()
}

function openResetPasswordModal() {
  menuDropdownRef.value.close()
  resetPasswordModalRef.value.open()
}

function closeResetPasswordModal() {
  resetPasswordModalRef.value.close()
}

function closeAddProductModal() {
  addProductModal.value.close()
}

function openLogInModal() {
  menuDropdownRef.value.close()

  if (isAwaitingTokenConfirmation.value) {
    openTwoFactorAuthModal()
    return
  }

  logInModalRef.value.open()
}

function closeLogInModal() {
  logInModalRef.value.close()
}

function openSignUpModal() {
  menuDropdownRef.value.close()

  if (isAwaitingTokenConfirmation.value) {
    openTwoFactorAuthModal()
    return
  }

  signUpModalRef.value.open()
}

function closeSignUpModal() {
  signUpModalRef.value.close()
}

onBeforeMount(() => {
  if (isAuthorized.value) {
    useAsyncData('fetch-profile',async () => {
      await userStore.fetch()
    })
  }
})
</script>
