<template>
  <ui-kit-modal title="Settings account" ref="setUpAccountModal">
    <template v-slot:content>
      <div>
        <h1></h1>
      </div>
    </template>
  </ui-kit-modal>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'
import UiKitModal from '~/components/UiKit/UiKitModal.vue'

const setUpAccountModal = ref<InstanceType<typeof UiKitModal>>(null)


function open() {
  setUpAccountModal.value?.open()
}

function close() {
  setUpAccountModal.value?.close()
}

defineExpose({ open, close })
</script>
