<template>
  <ui-kit-modal
    :with-footer="false"
    title="Start Selling"
    ref="startSellingModal"
    class="auth-modal"
  >
    <template v-slot:content>
      <span v-if="error" class="form-errors-list">
          <span
            class="form-error error"
            v-html="error"
          ></span>
        </span>
      <div >
        <div class="ui-kit-box-content-small-text">
          <span class="ui-kit-box-content-success-text" v-if="textData.length !== 0">
            <p style="margin-bottom:10px" v-html="tData.text_content.replace(/\n/g, '<br>')" v-for="(tData, index) in textData" :key="index" :style="{color:tData.text_colour}">
            </p>
          </span>
        </div>

        <div class="ui-kit-modal-content-buttons">
          <button
            @click="openSignUpModal"
            class="button full-width"
          >
            <span>Continue</span>
          </button>
        </div>
      </div>
    </template>
  </ui-kit-modal>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { required, email } from '@vuelidate/validators'
import { useRoute } from 'vue-router'
import useVuelidate from '@vuelidate/core'
import { useAuthStore } from '~/store/auth'
import { useAsyncData } from '#app'
import { useTextsStore } from '~/store/texts'
import { useStore } from '~/store'
import type { LoginData } from '~/types/auth'
import UiKitModal from '~/components/UiKit/UiKitModal.vue'
import UiKitInput from '~/components/UiKit/UiKitInput.vue'

const startSellingModal = ref<InstanceType<typeof UiKitModal>>(null)
const authStore = useAuthStore()
const textsStore = useTextsStore()
const store = useStore()
const route = useRoute()
const emit = defineEmits(['openSignUpModal', 'openTwoFactorAuthModal', 'openResetPasswordModal'])
let error = ref()
let serverErrors = ref({})
const textData = ref(1);

function openSignUpModal() {
  close()
  emit('openSignUpModal')
}

function openResetPasswordModal() {
  close()
  emit('openResetPasswordModal')
}

function openTwoFactorAuthModal() {
  close()
  emit('openTwoFactorAuthModal')
}

function open() {
  textData.value = textsStore.getByname('start_selling'),
  
  startSellingModal.value?.open()
}

function close() {
  startSellingModal.value?.close()
}

defineExpose({ open, close })

await useAsyncData('texts', async () => await textsStore.fetchAll())
</script>