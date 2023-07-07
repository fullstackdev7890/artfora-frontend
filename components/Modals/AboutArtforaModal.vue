<template>
  <ui-kit-modal
    :title="'About ARTfora'"
    :with-footer="false"
    class="artfora-modal"
    ref="aboutArtforaForm"
  >
    <template v-slot:content>
      <about :items="artforas"></about>
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
const aboutArtforaForm = ref<InstanceType<typeof UiKitModal>>(null);
const textsStore = useTextsStore();

const artforas = computed(() => textsStore?.getArtfora());
const artforaheaderColor = computed(() =>
  artforas?.value ? artforas.value[0]?.text_colour : ""
);
function open() {
  aboutArtforaForm.value?.open();
}

function close() {
  aboutArtforaForm.value?.close();
}

defineExpose({ open, close });
</script>
