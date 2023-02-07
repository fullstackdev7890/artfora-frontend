<template>
  <div class="profile-menu">
    <div class="new-product" v-if="isAuthorized">
      <plus-icon class="plus-icon"/>
    </div>
    <div class="icon-button" @click="menuDropdownRef.open()">
      <img
        :src="userAvatar"
        alt="user_avatar"
      >
    </div>

    <ui-kit-dropdown title="Menu" ref="menuDropdownRef">
      <div v-if="isAuthorized" class="ui-kit-dropdown-content-item">
        <a href="#" class="ui-kit-dropdown-content-item-btn">My Settings</a>
      </div>

      <div v-if="!isAuthorized" class="ui-kit-dropdown-content-item">
        <a href="#" class="ui-kit-dropdown-content-item-btn">Login/Sign up</a>
      </div>

      <div class="ui-kit-dropdown-content-item">
        <a href="#" class="ui-kit-dropdown-content-item-btn">Gallery settings</a>
      </div>

      <div class="ui-kit-dropdown-content-item">
        <a href="#" class="ui-kit-dropdown-content-item-btn">Contact us</a>
      </div>

      <div v-if="isAuthorized" class="ui-kit-dropdown-content-item">
        <a href="#" class="ui-kit-dropdown-content-item-btn">Logout</a>
      </div>
    </ui-kit-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '~/store/auth'
import {useUserStore} from '~/store/user'
import UiKitDropdown from '~/components/UiKit/UiKitDropdown.vue'
import PlusIcon from '~/assets/svg/plus.svg'
import avatar from '~/assets/images/logo.jpg'

const { isAuthorized } = useAuthStore()
const { getUserAvatar } = useUserStore()
const menuDropdownRef = ref<InstanceType<typeof UiKitDropdown>>(null)
const userAvatar = computed(() => getUserAvatar ?? avatar)
</script>
