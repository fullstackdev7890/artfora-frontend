<template>
  <div class="profile-menu">
    <div
      v-if="isAuthorized"
      @click="emit('openAddProductModal')"
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
        <span
          @click="openSignUpModal"
          class="ui-kit-dropdown-content-item-btn"
        >Login/Sign up</span>
      </div>

      <div class="ui-kit-dropdown-content-item">
        <span @click="openSettingsGallery" class="ui-kit-dropdown-content-item-btn">Gallery settings</span>
      </div>

      <div class="ui-kit-dropdown-content-item">
        <span
          @click="openContactUsModal"
          class="ui-kit-dropdown-content-item-btn"
        >Contact us</span>
      </div>

      <div v-if="isAuthorized" class="ui-kit-dropdown-content-item">
        <span
          class="ui-kit-dropdown-content-item-btn"
          @click="logout"
        >Logout</span>
      </div>
    </ui-kit-dropdown>

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

const emit = defineEmits(['openAddProductModal', 'openSignUpModal', 'openContactUsModal', 'openGallerySettingsModal'])

const menuDropdownRef = ref<InstanceType<typeof UiKitDropdown>>(null)

const authStore = useAuthStore()
const userStore = useUserStore()
const { isAuthorized } = storeToRefs(authStore)
const { userAvatar } = storeToRefs(userStore)
const { getUserAvatar } = useMedia()


function logout() {
  authStore.logout()
  menuDropdownRef.value.close()
}

function openSettingsGallery() {
  menuDropdownRef.value.close()
  emit('openGallerySettingsModal')
}

function openSignUpModal() {
  menuDropdownRef.value.close()
  emit('openSignUpModal')
}

function openContactUsModal() {
  menuDropdownRef.value.close()
  emit('openContactUsModal')
}

onBeforeMount(() => {
  if (isAuthorized.value) {
    useAsyncData('fetch-profile',async () => {
      await userStore.fetch()
    })
  }
})
</script>
