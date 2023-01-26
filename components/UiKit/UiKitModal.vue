<template>
  <div
    v-if="isShown"
    cy-name="modal"
    class="ui-kit-modal"
  >
    <div class="ui-kit-modal-background" @click="close()"></div>

    <ui-kit-box
      :title="title"
      :with-footer="true"
      @close="isShown = false"
      class="ui-kit-modal-content"
    >
      <template v-slot:content>
        <slot name="content"/>
      </template>

      <template v-slot:footer>
        <slot name="buttons"/>
      </template>
    </ui-kit-box>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  title?: string
}

const props = withDefaults(defineProps<Props>(), {})
const isShown = ref(false)

function open() {
  isShown.value = true
}

function close() {
  isShown.value = false
}

defineExpose({ open, close })
</script>