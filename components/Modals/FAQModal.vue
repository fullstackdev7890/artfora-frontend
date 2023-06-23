<template>
    <ui-kit-modal
      :title="'FAQ'"
      :with-footer="false"
      class="faq-modal"
      ref="faqModalForm"
    >
  
      <template v-slot:content>
        <div  v-for="(faq, index) in faqs" :key="index">
            <div v-if="faq.text_order%2===1" class="faq-title" :style="{color:faq.text_colour}">{{faq.text_content}} </div>
            <div v-if="faq.text_order%2===0" class="faq-content" :style="{color:faq.text_colour}">{{faq.text_content}} </div>
        </div>
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
  import { computed } from 'vue'
  import UiKitModal from '~/components/UiKit/UiKitModal.vue'
  import { useTextsStore } from '~/store/texts'

  
  const textsStore = useTextsStore()
  const faqModalForm = ref<InstanceType<typeof UiKitModal>>(null)
    const faqs = computed(() => textsStore?.getFaq())
    function open() {
      faqModalForm.value?.open()
    }
    
  function close() {
    faqModalForm.value?.close()
  }
  
  defineExpose({ open, close })
  </script>