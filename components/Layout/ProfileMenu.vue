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
          @click="authStore.logout()"
        >Logout</span>
      </div>
    </ui-kit-dropdown>

    <sign-up-modal ref="signUpModalRef" />

    <add-product ref="addProductModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '~/store/auth'
import { useUserStore } from '~/store/user'
import UiKitDropdown from '~/components/UiKit/UiKitDropdown.vue'
import PlusIcon from '~/assets/svg/plus.svg'
import avatar from '~/assets/images/logo.jpg'
import SignUpModal from '~/components/modals/SignUpModal.vue'
import AddProduct from '~/components/modals/AddProduct.vue'
import UiKitModal from '~/components/UiKit/UiKitModal.vue'

const { isAuthorized } = useAuthStore()
const { getUserAvatar } = useUserStore()
const menuDropdownRef = ref<InstanceType<typeof UiKitDropdown>>(null)
const signUpModalRef = ref<InstanceType<typeof SignUpModal>>(null)
const addProductModal = ref<InstanceType<typeof UiKitModal>>(null)
const userAvatar = computed(() => getUserAvatar ?? avatar)
const authStore = useAuthStore()

const router = useRouter()

router.beforeEach((to, from, next) => {
  closeSignUpModal()

  next()
})

function openSignUpModal() {
  menuDropdownRef.value.close()
  signUpModalRef.value.open()
}

function closeSignUpModal() {
  signUpModalRef.value.close()
}
</script>
