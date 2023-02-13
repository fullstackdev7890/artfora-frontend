<template>
  <div class="profile-menu">
    <div
      v-if="isAuthorized"
      class="new-product"
    >
      <plus-icon class="plus-icon"/>
    </div>
    <div
      @click="menuDropdownRef.open()"
      class="icon-button"
    >
      <img
        :src="userAvatar"
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

    <sign-up-modal
      ref="signUpModalRef"
      @open-log-in-modal="openLogInModal"
    />

    <log-in-modal
      ref="logInModalRef"
      @open-sign-up-modal="openSignUpModal"
      @open-two-factor-auth-modal="openTwoFactorAuthModal"
    />

    <two-factor-auth-modal ref="TwoFactorAuthModalRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '~/store/auth'
import { useUserStore } from '~/store/user'
import { storeToRefs } from 'pinia'
import UiKitDropdown from '~/components/UiKit/UiKitDropdown.vue'
import PlusIcon from '~/assets/svg/plus.svg'
import avatar from '~/assets/images/logo.jpg'
import SignUpModal from '~/components/modals/SignUpModal.vue'
import LogInModal from '~/components/modals/LogInModal.vue'
import TFAModal from '~/components/modals/TwoFactorAuthModal.vue'
import TwoFactorAuthModal from "~/components/modals/TwoFactorAuthModal.vue";

const authStore = useAuthStore()
const userStore = useUserStore()
const { isAuthorized, isAwaitingTokenConfirmation } = storeToRefs(authStore)
const { getUserAvatar } = storeToRefs(userStore)

const userAvatar = computed(() => getUserAvatar.value ?? avatar)

const menuDropdownRef = ref<InstanceType<typeof UiKitDropdown>>(null)
const signUpModalRef = ref<InstanceType<typeof SignUpModal>>(null)
const logInModalRef = ref<InstanceType<typeof LogInModal>>(null)
const TwoFactorAuthModalRef = ref<InstanceType<typeof TFAModal>>(null)

const router = useRouter()

router.beforeEach((to, from, next) => {
  closeSignUpModal()
  closeLogInModal()
  closeTFAModal()

  next()
})

function logout() {
  authStore.logout()
  menuDropdownRef.value.close()
}

function openTwoFactorAuthModal() {
  menuDropdownRef.value.close()
  TwoFactorAuthModalRef.value.open()
}

function closeTFAModal() {
  TwoFactorAuthModalRef.value.close()
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
</script>
