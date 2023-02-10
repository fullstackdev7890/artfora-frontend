<template>
  <ui-kit-modal
    :title="'Login'"
    :with-footer="false"
    ref="logInModal"
    class="auth-modal"
  >
    <template v-slot:content>
      <form v-if="!success" @submit.prevent="logIn">
        <p class="ui-kit-box-content-small-text">
          Don't have an account?
          <span
            class="link"
            @click="openSignUpModal"
          >Sign up here!</span>
        </p>

        <ui-kit-input
          v-model="auth.login"
          :errors="v$.auth.login"
          :error-messages="{ required: 'Please enter email. ', email: 'Please enter valid email address. ' }"
          :server-errors="serverErrors"
          :disabled="store.pendingRequestsCount"
          placeholder="EMAIL ADDRESS"
          name="login"
        />

        <ui-kit-input
          v-model="auth.password"
          :errors="v$.auth.password"
          :error-messages="{ required: 'Please enter password. ' }"
          :server-errors="serverErrors"
          :disabled="store.pendingRequestsCount"
          placeholder="PASSWORD"
          name="password"
        />

        <span v-if="error" class="form-errors-list">
          <span
            class="form-error error"
            v-html="error"
          ></span>
        </span>

        <p class="ui-kit-box-content-small-text align-right">
          Forgot your password?
          <span class="link">Reset here!</span>
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
import { ref, computed } from '@vue/reactivity'
import { required, email } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { useAuthStore } from '~/store/auth'
import { useStore } from '~/store'
import type { LoginData } from '~/types/auth'
import UiKitModal from '~/components/UiKit/UiKitModal.vue'
import UiKitInput from '~/components/UiKit/UiKitInput.vue'

const logInModal = ref<InstanceType<typeof UiKitModal>>(null)
const authStore = useAuthStore()
const store = useStore()
const emit = defineEmits(['openSignUpModal'])

const auth: LoginData = reactive({
  login: '',
  password: ''
})

let error = ref('')
let serverErrors = ref({})
let success = ref(false)

const v$ = useVuelidate({
  auth: {
    login: { required, email },
    password: { required },
  }
}, { auth })

async function logIn() {
  v$.value.$touch()

  if (v$.value.$error) {
    return
  }

  error.value = ''
  serverErrors.value = {}

  try {
    await authStore.login(auth)

    success.value = true
  } catch (e) {
    if (e.response && !e.response.data.errors) {
      error.value = 'Something went wrong! Please try again later.'

      return
    }

    serverErrors.value = e.response.data.errors
  }
}

function openSignUpModal() {
  close()
  emit('openSignUpModal')
}

function open() {
  logInModal.value?.open()
}

function close() {
  logInModal.value?.close()
}

defineExpose({ open, close })
</script>