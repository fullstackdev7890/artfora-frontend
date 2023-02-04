<template>
  <div
    v-if="isShown"
    class="ui-kit-modal"
  >
    <div class="ui-kit-modal-background" @click="closeByClickOutsideAction()"></div>

    <ui-kit-box
      :title="title"
      :with-header="true"
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
  title?: string,
  closeByClickOutside?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  closeByClickOutside: false
})
const isShown = ref(false)

function open() {
  isShown.value = true
}

function close() {
  isShown.value = false
}

function closeByClickOutsideAction() {
  if (props.closeByClickOutside) {
    close()
  }
}

defineExpose({ open, close })
</script>