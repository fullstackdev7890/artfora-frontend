<template>
  <ui-kit-modal
    :title="'About ARTfora'"
    :with-footer="false"
    class="artfora-modal"
    ref="sellerSupportForm"
  >
    <template v-slot:content>
      <about :items="sellerSupports"></about>
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
import { useTextsStore } from "~/store/texts";
import About from "~/components/Users/About.vue";
const sellerSupportForm = ref<InstanceType<typeof UiKitModal>>(null);
const textsStore = useTextsStore();

const sellerSupports = computed(() => textsStore?.getSellerSupport());

function open() {
  sellerSupportForm.value?.open();
}

function close() {
  sellerSupportForm.value?.close();
}

defineExpose({ open, close });
</script>
