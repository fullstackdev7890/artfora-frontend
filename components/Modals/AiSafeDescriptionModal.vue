<template>
  <ui-kit-modal :with-footer="false" title="AI safe" ref="aiSafeDescription">
    <template v-slot:content>
      <about :items="aiSafes"></about>
      <div class="ui-kit-modal-content-buttons">
        <button class="button full-width" @click="aiSafeDescription.close()">
          <span>CLOSE</span>
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

const textsStore = useTextsStore();
const aiSafeDescription = ref<InstanceType<typeof UiKitModal>>(null);
const aiSafes = computed(function () {
  return textsStore?.getAiSafe();
});
function open() {
  aiSafeDescription.value?.open();
}

function close() {
  aiSafeDescription.value?.close();
}

defineExpose({ open, close });
</script>
