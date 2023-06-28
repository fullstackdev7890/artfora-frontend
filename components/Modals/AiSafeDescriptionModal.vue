<template>
  <ui-kit-modal
    :with-footer="false"
    title="AI safe"
    ref="aiSafeDescription"
  >
    <template v-slot:content>
      <div class="ai-safe-description">
        <div  v-for="(aiSafe, index) in aiSafes" :key="index">
            <div class="aiSafe-title" :style="{color:aiSafe.text_colour, paddingBottom:aiSafe.text_type==='divide'?'1rem':'0.2rem'}" v-html="aiSafe.text_content"> </div>
          </div>
      </div>
      <div class="ui-kit-modal-content-buttons">
        <button class="button full-width" @click="aiSafeDescription.close()">
          <span>CLOSE</span>
        </button>
      </div>
    </template>
  </ui-kit-modal>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'
import UiKitModal from '~/components/UiKit/UiKitModal.vue'
import { useTextsStore } from '~/store/texts'

const textsStore = useTextsStore()
const aiSafeDescription = ref<InstanceType<typeof UiKitModal>>(null)
  const aiSafes = computed(() => textsStore?.getAiSafe())
function open() {
  aiSafeDescription.value?.open()
}

function close() {
  aiSafeDescription.value?.close()
}

defineExpose({ open, close })
</script>