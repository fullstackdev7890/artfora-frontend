<template>
  <ui-kit-modal :title="'Contact'" :with-footer="false" ref="contactForm" class="">
    <template v-slot:content>
      <ui-kit-input
        v-model="contactFormData.name"
        :errors="FormValidate.contactFormData.name"
        :error-messages="{ required: 'Please enter username.' }"
        type="text"
        placeholder="YOUR NAME"
      />
      <ui-kit-input
        v-model="contactFormData.email"
        :errors="FormValidate.contactFormData.email"
        :error-messages="{ required: 'Please enter email.', email: 'Please enter valid email address.' }"
        type="mail"
        placeholder="YOUR EMAIL ADDRESS"
      />
      <ui-kit-text-area
        :errors="FormValidate.contactFormData.text"
        :error-messages="{ required: 'Please enter text.'}"
        v-model="contactFormData.text"
        placeholder="YOUR MESSAGE"
      />

      <div class="ui-kit-modal-content-buttons">
        <button class="button full-width" @click="sendForm">SEND MESSAGE</button>
      </div>
    </template>
  </ui-kit-modal>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { required, email } from '@vuelidate/validators'
import { useContactFormState } from '~/store/contactForm'
import UiKitModal from '~/components/UiKit/UiKitModal.vue'
import useVuelidate from '@vuelidate/core'

const contactForm = ref<InstanceType<typeof UiKitModal>>(null)
const contactFormData = reactive({
  name: '',
  email: '',
  text: '',
})

const contactStore = useContactFormState()

const FormValidate = useVuelidate({
  contactFormData: {
    name: { required },
    email: { required, email },
    text: { required }
  }
}, { contactFormData })

const sendForm = () => {
  FormValidate.value.$touch()

  if (FormValidate.value.$error) {
    return
  }

  contactStore.send(contactFormData).then(() => close())

}

function open() {
  contactForm.value?.open()
}

function close() {
  contactForm.value?.close()
}

defineExpose({ open, close })
</script>