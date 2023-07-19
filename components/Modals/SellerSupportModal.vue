<template>
  <ui-kit-modal
    :title="'Seller Support'"
    :with-footer="false"
    class="artfora-modal"
    ref="sellerSupportModalRef"
  >
    <template v-slot:content>
      <div class="ui-kit-modal-content-buttons">
        <button class="button button-grey full-width" @click="close">
          <span>Close</span>
        </button>
      </div>
    </template>
  </ui-kit-modal>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import UiKitModal from "~/components/UiKit/UiKitModal.vue";
const sellerSupportModalRef = ref<InstanceType<typeof UiKitModal>>();

function open() {
  sellerSupportModalRef.value && sellerSupportModalRef.value?.open();
}

function close() {
  sellerSupportModalRef.value && sellerSupportModalRef.value?.close();
}

defineExpose({ open, close });
</script>
