<template>
  <ui-kit-modal
    :title="success ? 'Message sent' : 'Contact'"
    :with-footer="false"
    ref="contactForm"
  >

    <template v-slot:content>
      <form v-if="!success" @submit.prevent="sendForm">
        <ui-kit-input
          v-model="contactFormData.name"
          :errors="v$.contactFormData.name"
          :error-messages="{ required: 'Please enter username.' }"
          type="text"
          placeholder="YOUR NAME"
        />

        <ui-kit-input
          v-model="contactFormData.email"
          :errors="v$.contactFormData.email"
          :error-messages="{ required: 'Please enter email.', email: 'Please enter valid email address.' }"
          type="mail"
          placeholder="YOUR EMAIL ADDRESS"
        />

        <ui-kit-text-area
          :errors="v$.contactFormData.text"
          :error-messages="{ required: 'Please enter text.'}"
          v-model="contactFormData.text"
          placeholder="YOUR MESSAGE"
        />

        <div class="ui-kit-modal-content-buttons">
          <button class="button full-width" @click="sendForm">SEND MESSAGE</button>
        </div>
      </form>

      <div v-else class="contact-modal-submit">
        <h4>YOUR NAME: <br>
          <span>{{ contactFormData.name }}</span>
        </h4>
        <h4>YOUR EMAIL ADDRESS: <br>
          <span>{{ contactFormData.email }}</span>
        </h4>
        <h4>YOUR MESSAGE: <br>
          <span>{{ contactFormData.text }}</span>
        </h4>
        <p class="ui-kit-box-content-small-text">
          <span class="ui-kit-box-content-success-text">
            We have also sent you a copy of the message to your email address.
          </span>
        </p>
        <div class="ui-kit-modal-content-buttons">
          <button
            @click="close"
            class="button full-width"
          >
            Close
          </button>
        </div>
      </div>
    </template>
  </ui-kit-modal>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { required, email } from '@vuelidate/validators'
import { useStore } from '~/store/index'
import UiKitModal from '~/components/UiKit/UiKitModal.vue'
import useVuelidate from '@vuelidate/core'

const contactForm = ref<InstanceType<typeof UiKitModal>>(null)
const contactFormData = reactive({
  name: '',
  email: '',
  text: '',
})

const contactStore = useStore()
const success = ref(false)

const v$ = useVuelidate({
  contactFormData: {
    name: { required },
    email: { required, email },
    text: { required }
  }
}, { contactFormData })

const sendForm = () => {
  v$.value.$touch()

  if (v$.value.$error) {
    return
  }

  contactStore.send(contactFormData)

  success.value = true
}

function open() {
  contactForm.value?.open()
}

function close() {
  contactForm.value?.close()
}

defineExpose({ open, close })
</script>