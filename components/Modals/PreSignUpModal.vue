<template>
  <ui-kit-modal
    :with-footer="false"
    title="Welcome"
    ref="preSignUpModal"
    class=""
  >
    <template v-slot:content>
      <span v-if="error" class="form-errors-list">
          <span
            class="form-error error"
            v-html="error"
          ></span>
        </span>
      <div >
        <p class="ui-kit-box-content-small-text">
          <span class="ui-kit-box-content-success-text">
            <div class="" v-if="textData.length !== 0" v-for="text in textData">
                {{ text.text_name }}
                {{ text.text_content }}
            </div>
          </span>
        </p>

        <div class="ui-kit-modal-content-buttons">
          <button
            @click="openSignUpModal"
            class="button full-width"
          >
            <span>Continue to sign up</span>
          </button>
        </div>
      </div>
    </template>
  </ui-kit-modal>
</template>

<script setup lang="ts">
import { ref, computed } from '@vue/reactivity'
import axios from 'axios'
import { useAuthStore } from '~/store/auth'
import { useStore } from '~/store'
import { useRoute, useRouter } from 'vue-router'
import useVuelidate from '@vuelidate/core'
import type { SignUpData } from '~/types/auth'
import UiKitModal from '~/components/UiKit/UiKitModal.vue'

const preSignUpModal = ref<InstanceType<typeof UiKitModal>>(null)
  
const emit = defineEmits(['openSignUpModal'])
const textData = ref(1);
const auth: SignUpData = reactive({
  email: '',
  password: '',
  confirm: '',
  username: '',
  tagname: '',
  redirect_after_verification: '/?open-set-up-modal=true'
})

let error = ref('')
let serverErrors = ref({})
let success = ref(false)



function refreshModal() {
    auth.email = ''
    auth.password = ''
    auth.confirm = ''
    auth.username = ''
    auth.tagname = ''
    auth.redirect_after_verification = '/?open-set-up-modal=true'
}

async function gettext() {
  
  
  error.value = ''
  try {
    const response = await axios.get('/text')
    textData.value = response.data.text;


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
  gettext()
  preSignUpModal.value?.open()
}

function close() {
  preSignUpModal.value?.close()
}

defineExpose({ open, close })
</script>