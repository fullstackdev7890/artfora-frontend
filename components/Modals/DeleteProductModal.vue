<template>
  <ui-kit-modal
  title="Delete Product"
  :with-header="false"
  :with-footer="false"
  ref="deleteProductModal"
  class="confirm-modal"
  >
  <template v-slot:customHeader>
    <header class="confirm-modal-header">
      <h5>Delete Product</h5>
    </header>
  </template>

  <template v-slot:content>
    <p>
      Are you sure that you want to delete this product?
    </p>
    <p>
      It can not be undone.
    </p>

    <div class="confirm-modal-buttons">
      <button style="color: red" @click="close()" class="button-grey button btn-space">
        <span>No</span>
      </button>&nbsp;&nbsp;&nbsp;
      <button @click="confirm()" class="button-grey button btn-space">
        <span>Yes</span>
      </button>
    </div>
 
  </template>
  </ui-kit-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UiKitModal from '~/components/UiKit/UiKitModal.vue'
const emit = defineEmits(['confirm'])

const deleteProductModal = ref<InstanceType<typeof UiKitModal>>(null)

function confirm() {
  emit('confirm')
}

async function open() {
  deleteProductModal.value?.open()
}

function close() {
  deleteProductModal.value?.close()
}

defineExpose({ open, close })
</script>
