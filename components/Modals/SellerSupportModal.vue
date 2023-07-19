<template>
  <ui-kit-modal
    :title="'Seller Support'"
    :with-footer="false"
    class="artfora-modal"
    ref="sellerSupportModalRef"
  >
    <template v-slot:content>
      <about :items="sellerSupportTexts"></about>
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
import About from "~/components/Users/About.vue";
import { useTextsStore } from "~/store/texts";

const textsStore = useTextsStore();
const sellerSupportModalRef = ref<InstanceType<typeof UiKitModal>>();
const sellerSupportTexts = computed(() => textsStore?.getSellerSupport());

function open() {
  sellerSupportModalRef.value && sellerSupportModalRef.value?.open();
}

function close() {
  sellerSupportModalRef.value && sellerSupportModalRef.value?.close();
}

defineExpose({ open, close });
</script>
