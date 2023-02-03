<template>
  <div class="profile-menu">
    <div class="icon-button" @click="toggleCollapsing()">
      <img src="~/assets/images/logo.jpg" alt="user_avatar">
    </div>
    <menu-dropdown :collapsed="isCollapse" @collapse="isCollapse = false" />
  </div>
</template>

<script setup lang="ts">
import MenuDropdown from '~/components/Layout/Menu-Dropdown.vue'

import { ref } from 'vue'

const isCollapse = ref(false)
function toggleCollapsing() {
  isCollapse.value = !isCollapse.value
}
</script>
