<template>
  <ui-kit-modal :title="'CART'" :with-footer="false" class="cart-modal" ref="cartForm">
    <template v-slot:content>
      <div class="ui-kit-cart-modal-content">

      </div>

      <div class="ui-kit-modal-content-buttons">
        <button class="button button-grey full-width" @click="close"><span>GO TO CHECKOUT</span></button>
      </div>
    </template>
  </ui-kit-modal>
</template>
  
<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { EmitFlags } from 'typescript'
import UiKitModal from '~/components/UiKit/UiKitModal.vue'
import { useTextsStore } from '~/store/texts'

const cartForm = ref<InstanceType<typeof UiKitModal>>(null)
const emit = defineEmits(['openCheckoutModal'])

function open() {
  cartForm.value?.open()
}

function close() {
  cartForm.value?.close()
  emit("openCheckoutModal")
}

defineExpose({ open, close })
</script>