<template>
  <ui-kit-modal
    :with-footer="false"
    title="Start Selling"
    ref="startSellingModal"
    class="auth-modal"
  >
    <template v-slot:content>
      <form>
        <div>Start Selling</div>
      </form>
    </template>
  </ui-kit-modal>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { required, email } from '@vuelidate/validators'
import { useRoute } from 'vue-router'
import useVuelidate from '@vuelidate/core'
import { useAuthStore } from '~/store/auth'
import { useStore } from '~/store'
import type { LoginData } from '~/types/auth'
import UiKitModal from '~/components/UiKit/UiKitModal.vue'
import UiKitInput from '~/components/UiKit/UiKitInput.vue'

const startSellingModal = ref<InstanceType<typeof UiKitModal>>(null)
const authStore = useAuthStore()
const store = useStore()
const route = useRoute()
const emit = defineEmits(['openSignUpModal', 'openTwoFactorAuthModal', 'openResetPasswordModal'])

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
  startSellingModal.value?.open()
}

function close() {
  startSellingModal.value?.close()
}

defineExpose({ open, close })
</script>