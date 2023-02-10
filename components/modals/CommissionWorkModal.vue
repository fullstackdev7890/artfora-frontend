<template>
  <ui-kit-modal :title="'Commission work'" :with-footer="false" ref="commissionWork" class="">
   <template v-slot:content>
    <ui-kit-input
      v-model="commissionWorkData.name"
      :errors="FormValidate.commissionWorkData.name"
      :error-messages="{ required: 'Please enter username.' }"
      type="text"
      placeholder="YOUR NAME"
    />
    <ui-kit-input
      v-model="commissionWorkData.email"
      :errors="FormValidate.commissionWorkData.email"
      :error-messages="{ required: 'Please enter email.', email: 'Please enter valid email address.' }"
      type="mail"
      placeholder="YOUR EMAIL ADDRESS"
    />
    <ui-kit-text-area
      v-model="commissionWorkData.text"
      :errors="FormValidate.commissionWorkData.text"
      :error-messages="{ required: 'Please enter text.'}"
      placeholder="YOUR MESSAGE"
    />

     <div class="ui-kit-modal-content-buttons">
       <button class="button full-width" @click="sendForm()">SEND MESSAGE</button>
     </div>
   </template>
  </ui-kit-modal>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { email, required } from '@vuelidate/validators'
import { useCommissionWorkState } from '~/store/commissionWork'
import useVuelidate from '@vuelidate/core'
import UiKitModal from '~/components/UiKit/UiKitModal.vue'

interface Props {
  userId: number
}
const props = defineProps<Props>()
const commissionWork = ref<InstanceType<typeof UiKitModal>>(null)
const commissionWorkData = reactive({
  name: '',
  email: '',
  text: '',
})

const commissionFormStore = useCommissionWorkState()

const FormValidate = useVuelidate({
  commissionWorkData: {
    name: { required },
    email: { required, email },
    text: { required }
  }
}, { commissionWorkData })

const sendForm = () => {
  FormValidate.value.$touch()

  if (FormValidate.value.$error) {
    return
  }


  commissionFormStore.send(props.userId, commissionWorkData).then(() => close())
}

function open() {
  commissionWork.value?.open()
}

function close() {
  commissionWork.value?.close()
}

defineExpose({ open, close })
</script>