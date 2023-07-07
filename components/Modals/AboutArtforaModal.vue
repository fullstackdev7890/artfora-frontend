<template>
  <ui-kit-modal
    :title="'About ARTfora'"
    :with-footer="false"
    class="artfora-modal"
    ref="aboutArtforaForm"
  >
    <template v-slot:content>
      <div v-for="(artfora, index) in artforas" :key="index">
        <div
          class="artfora-title"
          :style="{
            color: artfora.text_colour,
            paddingBottom: artfora.text_type === 'divide' ? '2.5rem' : '0.5rem',
          }"
          v-html="artfora.text_content"
        ></div>
      </div>
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
