<template>
  <ui-kit-modal
    title="Commission work"
    :with-footer="false"
    ref="commissionWork"
  >
   <template v-slot:content>
     <form @submit.prevent="sendForm">
       <ui-kit-input
         v-model="commissionWorkData.name"
         :errors="v$.commissionWorkData.name"
         :error-messages="{ required: 'Please enter username.' }"
         :disabled="store.pendingRequestsCount"
         type="text"
         placeholder="YOUR NAME"
       />
       <ui-kit-input
         v-model="commissionWorkData.email"
         :errors="v$.commissionWorkData.email"
         :error-messages="{ required: 'Please enter email.', email: 'Please enter valid email address.' }"
         :disabled="store.pendingRequestsCount"
         type="mail"
         placeholder="YOUR EMAIL ADDRESS"
       />
       <ui-kit-text-area
         v-model="commissionWorkData.text"
         :errors="v$.commissionWorkData.text"
         :error-messages="{ required: 'Please enter text.'}"
         :disabled="store.pendingRequestsCount"
         placeholder="YOUR MESSAGE"
       />

       <div>
         <div id="mtcaptcha" class="mtcaptcha"></div>
         <span
           v-show="v$.commissionWorkData.mtcaptcha_token.$error"
           class="form-error error"
         >Captcha is required</span>
       </div>

       <div class="ui-kit-modal-content-buttons">
         <button
           :disabled="store.pendingRequestsCount"
           class="button full-width"
           type="submit"
         >SEND MESSAGE</button>
       </div>
     </form>
   </template>
  </ui-kit-modal>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { email, required } from '@vuelidate/validators'
import { useCommissionWorkState } from '~/store/commissionWork'
import useVuelidate from '@vuelidate/core'
import UiKitModal from '~/components/UiKit/UiKitModal.vue'
import {useStore} from "~/store";

interface Props {
  userId: number
}
const props = defineProps<Props>()
const commissionWork = ref<InstanceType<typeof UiKitModal>>(null)
const commissionWorkData = reactive({
  name: '',
  email: '',
  text: '',
  mtcaptcha_token: ''
})

const commissionFormStore = useCommissionWorkState()
const store = useStore()

const v$ = useVuelidate({
  commissionWorkData: {
    name: { required },
    email: { required, email },
    text: { required },
    mtcaptcha_token: { required }
  }
}, { commissionWorkData })

async function sendForm() {

  commissionWorkData.mtcaptcha_token = document.getElementsByClassName('mtcaptcha-verifiedtoken')[0].value

  v$.value.$touch()

  if (v$.value.$error) {
    return
  }

  await commissionFormStore.send(props.userId, commissionWorkData)

  close()
}

function open() {
  commissionWork.value?.open()
  window.mtcaptchaConfig.renderQueue.push("mtcaptcha")
}

function close() {
  commissionWork.value?.close()
}

defineExpose({ open, close })
</script>