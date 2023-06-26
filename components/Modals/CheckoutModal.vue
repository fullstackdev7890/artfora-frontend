<template>
    <ui-kit-modal :title="'CHECKOUT'" :with-footer="false" class="checkout-modal" ref="checkoutForm">
        <template v-slot:content>
            <div class="ui-kit-checkout-modal-content"></div>
            <div class="ui-kit-modal-content-buttons">
                <button class="button button-grey full-width" @click="close"><span>PLACE ORDER</span></button>
            </div>
        </template>
    </ui-kit-modal>
</template>
  
<script setup lang="ts">
import { ref } from '@vue/reactivity'
import UiKitModal from '~/components/UiKit/UiKitModal.vue'

const checkoutForm = ref<InstanceType<typeof UiKitModal>>(null)
const emit = defineEmits(['openCheckoutModal'])

function open() {
    checkoutForm.value?.open()
}

function close() {
    checkoutForm.value?.close()
    emit('openCheckoutModal')
}

defineExpose({ open, close })
</script>