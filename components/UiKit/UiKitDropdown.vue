<template>
  <div
    :cy-name="name"
    class="ui-kit-dropdown"
  >
    <div
      @click="toggleCollapsing()"
      class="ui-kit-dropdown-title"
    >
      {{ title }}
    </div>

    <div v-show="isCollapsed" class="ui-kit-dropdown-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: string,
  name: string,
  collapsed?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  collapsed: false
})

const emit = defineEmits(['collapse', 'expand'])

let isCollapsed = computed(() => props.collapsed)

function toggleCollapsing() {
  isCollapsed.value = !isCollapsed.value

  if (isCollapsed.value) {
    emit('collapse')
  } else {
    emit('expand')
  }
}
</script>