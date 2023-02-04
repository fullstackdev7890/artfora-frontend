<template>
  <ui-kit-modal
    :title="'Sign Up'"
    ref="signUpModal"
  >
    <template v-slot:content>
      <p>Hello there!</p>
    </template>

    <template v-slot:buttons>
      <button @click="close()">
        CLOSE
      </button>
    </template>
  </ui-kit-modal>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'
import UiKitModal from '~/components/UiKit/UiKitModal.vue'

const signUpModal = ref<InstanceType<typeof UiKitModal>>(null)

function open() {
  signUpModal.value?.open()
}

function close() {
  signUpModal.value?.close()
}

defineExpose({ open, close })
</script>