<template>
  <ui-kit-modal
    :title="'Safe login'"
    :with-footer="false"
    ref="TFAModal"
    class="auth-modal"
  >
    <template v-slot:content>
      <form @submit.prevent="confirmTFA">
        <p class="ui-kit-box-content-small-text">
          Please type in the 2 factor authentication code which we have sent you by email:
        </p>

        <ui-kit-input
          v-model="auth.code"
          :errors="v$.auth.code"
          :error-messages="{ required: 'Please enter 2 factor authentication code. ' }"
          :server-errors="serverErrors"
          :disabled="store.pendingRequestsCount"
          placeholder="AUTHENTICATION CODE"
          name="code"
        />

        <span
          v-if="error && !successResend && !success"
          class="form-errors-list"
        >
          <span class="form-error error">
            No no no nooo good!<br>Please try again or
            <span
              class="link"
              @click="resendEmailCode"
            >
              resend authentication code.
            </span>
          </span>
        </span>

        <p v-if="successResend" class="ui-kit-box-content-small-text">
          <span class="ui-kit-box-content-success-text">
            The 2 factor authentication has been resent to your email address.
          </span>
        </p>

        <div class="ui-kit-modal-content-buttons">
          <button
            :disabled="store.pendingRequestsCount"
            class="button full-width"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </template>
  </ui-kit-modal>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { required, email } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { useAuthStore } from '~/store/auth'
import { useStore } from '~/store'
import { storeToRefs } from 'pinia'
import type { TFAData } from '~/types/auth'
import UiKitModal from '~/components/UiKit/UiKitModal.vue'
import UiKitInput from '~/components/UiKit/UiKitInput.vue'

const TFAModal = ref<InstanceType<typeof UiKitModal>>(null)
const authStore = useAuthStore()
const store = useStore()
const { emailForTFA } = storeToRefs(authStore)

const auth: TFAData = reactive({
  code: '',
  email: null
})

let error = ref(false)
let serverErrors = ref({})
let success = ref(false)
let successResend = ref(false)

const v$ = useVuelidate({
  auth: {
    code: { required },
    email: { required, email }
  }
}, { auth })

async function confirmTFA() {
  auth.email = emailForTFA.value

  v$.value.$touch()

  if (v$.value.$error) {
    return
  }

  error.value = false
  serverErrors.value = {}
  successResend.value = false

  try {
    await authStore.checkEmailTFA(auth)

    success.value = true
    auth.code = ''

    close()
  } catch (e) {
    if (e.response && !e.response.data.errors) {
      error.value = true

      return
    }

    serverErrors.value = e.response.data.errors
  }
}

async function resendEmailCode() {
  v$.value.$touch()

  if (v$.value.$error) {
    return
  }

  error.value = false
  serverErrors.value = {}
  successResend.value = false

  try {
    await authStore.resendEmailTFACode(auth)

    successResend.value = true
  } catch (e) {
    if (e.response && !e.response.data.errors) {
      error.value = true

      return
    }

    serverErrors.value = e.response.data.errors
  }
}

function open() {
  TFAModal.value?.open()
}

function close() {
  TFAModal.value?.close()
}

defineExpose({ open, close })
</script>