<template>
  <form @submit.prevent="signUp">
    <ui-kit-modal
      :title="'Sign Up'"
      ref="signUpModal"
      class="auth-modal"
    >
      <template v-slot:content>
        <div v-if="!success">
          <p class="ui-kit-box-content-small-text">
            Already have an account? <span class="link">Login here!</span>
          </p>

          <ui-kit-input
            v-model="auth.username"
            :errors="v$.auth.username"
            :error-messages="{ required: 'Please enter username. ' }"
            :server-errors="serverErrors"
            :disabled="store.pendingRequestsCount"
            placeholder="USERNAME"
            name="username"
          />

          <ui-kit-input
            v-model="auth.tagname"
            :errors="v$.auth.tagname"
            :error-messages="{
              required: 'Please enter @tagname. ',
              containsTagNamePrefix: 'Tagname must start with a character @. '
            }"
            :server-errors="serverErrors"
            :attention-messages="{ notChanged: 'Can not be changed later. ' }"
            :disabled="store.pendingRequestsCount"
            placeholder="@TAGNAME"
            name="tagname"
          />

          <ui-kit-input
            v-model="auth.email"
            :errors="v$.auth.email"
            :error-messages="{ required: 'Please enter email. ', email: 'Please enter valid email address. ' }"
            :server-errors="serverErrors"
            :disabled="store.pendingRequestsCount"
            placeholder="EMAIL ADDRESS"
            name="email"
          />

          <ui-kit-input
            v-model="auth.password"
            :errors="v$.auth.password"
            :error-messages="{
              required: 'Please enter password. ',
              minLength: 'Minimum 8 characters. ',
              containsUppercase: 'Minimum 1 capital letter. ',
              containsNumber: 'Minimum 1 number. '
            }"
            :server-errors="serverErrors"
            :disabled="store.pendingRequestsCount"
            placeholder="PASSWORD"
            name="password"
          />

          <ui-kit-input
            v-model="auth.confirm"
            :errors="v$.auth.confirm"
            :error-messages="{ required: 'Please repeat password. ', sameAs: 'Does not match the entered password. ' }"
            :server-errors="serverErrors"
            :disabled="store.pendingRequestsCount"
            placeholder="REPEAT PASSWORD"
            name="confirm"
          />

          <span v-if="error" class="form-errors-list">
            <span
              class="form-error error"
              v-html="error"
            ></span>
          </span>
        </div>

        <p
          v-else
          class="ui-kit-box-content-small-text"
        >
          <span class="ui-kit-box-content-success-text">
            We have sent you an email with a link to verify your email address.
          </span>
        </p>
      </template>

      <template v-slot:buttons>
        <button
          v-if="!success"
          class="button full-width"
          type="submit"
          :disabled="store.pendingRequestsCount"
        >
          Send verification email
        </button>

        <button
          v-else
          class="button full-width"
          :disabled="store.pendingRequestsCount"
          @click="close"
        >
          Close
        </button>
      </template>
    </ui-kit-modal>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from '@vue/reactivity'
import {
  required, email, sameAs, minLength
} from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { useAuthStore } from '~/store/auth'
import { useStore } from '~/store'
import type { SignUpData } from '~/types/auth'
import UiKitModal from '~/components/UiKit/UiKitModal.vue'
import UiKitInput from '~/components/UiKit/UiKitInput.vue'

const signUpModal = ref<InstanceType<typeof UiKitModal>>(null)
const authStore = useAuthStore()
const store = useStore()

const auth: SignUpData = reactive({
  email: 'ololo@gmail.com',
  password: 'Ololo123',
  confirm: 'Ololo123',
  username: 'ololo',
  tagname: '@ololo',
  redirect_after_verification: '/'
})

let error = ref('')
let serverErrors = ref({})
let success = ref(false)

const v$ = useVuelidate({
  auth: {
    username: { required },
    tagname: {
      required,
      containsTagNamePrefix: (value: string) => {
        return /^@/.test(value)
      }
    },
    email: { required, email },
    password: {
      required,
      minLength: minLength(8),
      containsUppercase: (value: string) => {
        return /[A-Z]/.test(value)
      },
      containsNumber: (value: string) => {
        return /[0-9]/.test(value)
      },
    },
    confirm: {
      required,
      sameAs: sameAs(computed(() => {
        return auth.password
      })),
    }
  }
}, { auth })

async function signUp() {
  v$.value.$touch()

  if (v$.value.$error) {
    return
  }

  error.value = ''
  serverErrors.value = {}

  try {
    await authStore.signUp(auth)

    success.value = true
  } catch (e) {
    if (e.response && !e.response.data.errors) {
      error.value = 'Something went wrong! Please try again later.'

      return
    }

    serverErrors.value = e.response.data.errors
  }
}

function open() {
  signUpModal.value?.open()
}

function close() {
  signUpModal.value?.close()
}

defineExpose({ open, close })
</script>