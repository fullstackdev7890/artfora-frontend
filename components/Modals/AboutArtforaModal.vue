<template>
    <ui-kit-modal
      :title="'About ARTfora'"
      :with-footer="false"
      class="contact-modal"
      ref="aboutArtforaForm"
    >
      <template v-slot:content>
        <div class="ui-kit-modal-content-buttons">
          <button
            class="button button-grey full-width"
            @click="close"
          ><span>Close</span></button>
        </div>
      </template>
    </ui-kit-modal>
  </template>
  
  <script setup lang="ts">
  import { ref } from '@vue/reactivity'
  import UiKitModal from '~/components/UiKit/UiKitModal.vue'
  
  const aboutArtforaForm = ref<InstanceType<typeof UiKitModal>>(null)
  function open() {
    aboutArtforaForm.value?.open()
  }
  
  function close() {
    aboutArtforaForm.value?.close()
  }
  
  defineExpose({ open, close })
  </script>