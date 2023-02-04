<template>
  <ui-kit-modal
    :title="'Sign Up'"
    ref="signUpModal"
  >
    <template v-slot:content>
      <span class="ui-kit-box-content-small-text">
        Already have an account? <a href="#" class="link link-white">Login here!</a>
      </span>


    </template>

    <template v-slot:buttons>
      <button
        class="button"
        @click="close()"
      >
        Send verification email
      </button>
    </template>
  </ui-kit-modal>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { required, email } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { useAuthStore } from '~/store/auth'
import type { SignUpData } from '~/types/auth'
import UiKitModal from '~/components/UiKit/UiKitModal.vue'

const signUpModal = ref<InstanceType<typeof UiKitModal>>(null)
const store = useAuthStore()

const auth: SignUpData = reactive({
  email: '',
  password: '',
  repeatPassword: '',
  userName: '',
  tagName: ''
})

let error = ref('')

const v$ = useVuelidate({
  auth: {
    email: { required, email },
    password: { required },
  }
}, { auth })

function open() {
  signUpModal.value?.open()
}

function close() {
  signUpModal.value?.close()
}

defineExpose({ open, close })
</script>