<template>
  <ui-kit-modal :with-header="false" ref="setUpAccountModal">
    <template v-slot:content>
      <header>
        <close-icon
          @click="close()"
          class="close-icon ui-kit-box-tools-link"
        />
      </header>
    </template>
  </ui-kit-modal>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'
import UiKitModal from '~/components/UiKit/UiKitModal.vue'
import CloseIcon from '~/assets/svg/close.svg'

const setUpAccountModal = ref<InstanceType<typeof UiKitModal>>(null)


function open() {
  setUpAccountModal.value?.open()
}

function close() {
  setUpAccountModal.value?.close()
}

defineExpose({ open, close })
</script>
