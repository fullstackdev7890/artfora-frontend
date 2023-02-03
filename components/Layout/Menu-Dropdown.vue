<template>
    <UiKitDropdown
        :collapsed="$props.collapsed"
        title=""
        name="profile-menu"
        class="menu-dropdown-item"
    >
      <div class="menu-dropdown-item-content" ref="menuRef">
        <h1>Menu</h1>
        <ul>
          <li v-if="auth.token"><a href="#">My Settings</a></li>
          <li v-if="!auth.token"><a href="#">Login/Sign up</a></li>
          <li><a href="#">Gallery settings</a></li>
          <li><a href="#">Contact us</a></li>
          <li v-if="auth.token"><a href="#">Logout</a></li>
        </ul>
        <close @click="$emit('collapse')" />
      </div>
    </UiKitDropdown>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '~/store/auth'
import Close from '~/assets/svg/close.svg'

interface Props {
  collapsed: boolean
}

const props = withDefaults(defineProps<Props>(), {
  collapsed: false
})
const menuRef = ref()
const emit = defineEmits(['collapse'])
const auth = useAuthStore()

const handleClickOutside = (event: any) => {
  if (!menuRef.value.contains(event.target) && event.target.alt !== 'user_avatar') {
    emit('collapse')
    document.removeEventListener('click', handleClickOutside)
  }
}

watch(() => props.collapsed, (isCollapse) => {
  if (isCollapse) {
    document.addEventListener('click', handleClickOutside)
  }
})
</script>