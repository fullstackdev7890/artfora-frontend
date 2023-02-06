<template>
  <div class="profile-menu">
    <div class="icon-button" @click="menuDropdownRef.open()">
      <img src="~/assets/images/logo.jpg" alt="user_avatar">
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
import { ref } from 'vue'
import { useAuthStore } from '~/store/auth'
import UiKitDropdown from '~/components/UiKit/UiKitDropdown.vue'

const { isAuthorized } = useAuthStore()
const menuDropdownRef = ref<InstanceType<typeof UiKitDropdown>>(null)
</script>
