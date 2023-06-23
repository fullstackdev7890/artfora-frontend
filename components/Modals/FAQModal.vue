<template>
    <ui-kit-modal
      :title="'FAQ'"
      :with-footer="false"
      class="contact-modal"
      ref="faqModalForm"
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
  import { ref } from 'vue'
  import UiKitModal from '~/components/UiKit/UiKitModal.vue'
  
  const faqModalForm = ref<InstanceType<typeof UiKitModal>>(null)
  function open() {
    faqModalForm.value?.open()
  }
  
  function close() {
    faqModalForm.value?.close()
  }
  
  defineExpose({ open, close })
  </script>