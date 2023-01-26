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

      <a
        :class="{ 'fa-chevron-down': !isCollapsed, 'fa-chevron-up': isCollapsed }"
        class="ui-kit-box-tools-link fa"
        cy-name="collapse-button"
      ></a>
    </div>

    <div v-show="isCollapsed" class="ui-kit-dropdown-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity';

interface Props {
  title: string,
  name: string,
  collapsed?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  collapsed: false
})

const emit = defineEmits(['collapse', 'expand'])

let isCollapsed = ref(props.collapsed)

function toggleCollapsing() {
  isCollapsed.value = !isCollapsed.value

  if (isCollapsed.value) {
    emit('collapse')
  } else {
    emit('expand')
  }
}
</script>