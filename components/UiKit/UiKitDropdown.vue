<template>
  <div
    v-show="isCollapsed"
    class="ui-kit-dropdown"
    ref="menuDropdownRef"
  >
    <div
      class="ui-kit-dropdown-title"
    >
      {{ title }}
      <close @click="toggleCollapsing()" />
    </div>
    <div class="ui-kit-dropdown-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Close from '~/assets/svg/close.svg'
interface Props {
  title: string,
  insideArea: any
}

const isCollapsed = ref(false)
const props = defineProps<Props>()
const menuDropdownRef = ref(null)

const handleClickOutside = (event: any) => {
  if (props.insideArea.contains(event.target)) {
    return
  }
  toggleCollapsing()
}

function toggleCollapsing() {
  isCollapsed.value = !isCollapsed.value

  if (isCollapsed.value) {
    document.addEventListener('click', handleClickOutside)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
}

defineExpose({ toggleCollapsing })

</script>