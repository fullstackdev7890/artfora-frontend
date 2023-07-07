<template>
  <ui-kit-modal :title="'FAQ'" :with-footer="false" class="faq-modal" ref="faqModalForm">
    <template v-slot:content>
      <about :items="faqs"></about>
      <div class="ui-kit-modal-content-buttons">
        <button class="button button-grey full-width" @click="close">
          <span>Close</span>
        </button>
      </div>
    </template>
  </ui-kit-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { computed } from "vue";
import UiKitModal from "~/components/UiKit/UiKitModal.vue";
import About from "~/components/Users/About.vue";
import { useTextsStore } from "~/store/texts";
interface item {
  text_name: string;
  text_content: string;
  text_colour: string;
  text_type: string;
  text_order: number;
  admin_user: string;
}
const textsStore = useTextsStore();
const faqModalForm = ref<InstanceType<typeof UiKitModal>>(null);
const faqs = computed(() => textsStore?.getFaq());

function open() {
  faqModalForm.value?.open();
}

function close() {
  faqModalForm.value?.close();
}

defineExpose({ open, close });
</script>
