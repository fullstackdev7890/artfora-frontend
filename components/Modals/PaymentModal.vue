<template>
  <ui-kit-modal
    :title="'Payment'"
    :with-footer="false"
    class="checkout-modal"
    ref="paymentForm"
  >
    <template v-slot:content>
      <form @submit.prevent="placeOrder">
        <ui-kit-input
          v-model.lazy="stripe.cardNumber"
          :type="'number'"
          placeholder="Card Number"
          :error-messages="{ required: 'Card number is required.' }"
          :server-errors="serverErrors"
          :disabled="store.pendingRequestsCount"
          :errors="v$.stripe.cardNumber"
        />
        <div :style="{ display: 'flex', justifyContent: 'space-between' }">
          <ui-kit-input
            v-model.lazy="stripe.cvc"
            :type="'number'"
            placeholder="CVC"
            :error-messages="{ required: 'CVC is required.' }"
            :server-errors="serverErrors"
            :disabled="store.pendingRequestsCount"
            :errors="v$.stripe.cvc"
          />
        </div>
        <div :style="{ display: 'flex', justifyContent: 'space-between' }">
          <div :style="{ paddingRight: '0.5rem' }">
            <ui-kit-input
              v-model.lazy="stripe.expireMonth"
              :type="'number'"
              placeholder="Expire Month"
              :error-messages="{ required: 'Expire Month is required.' }"
              :server-errors="serverErrors"
              :disabled="store.pendingRequestsCount"
              :errors="v$.stripe.expireMonth"
            />
          </div>
          <div>
            <ui-kit-input
              v-model.lazy="stripe.expireYear"
              :type="'number'"
              placeholder="Expire Year"
              :error-messages="{ required: 'Expire Year is required.' }"
              :server-errors="serverErrors"
              :disabled="store.pendingRequestsCount"
              :errors="v$.stripe.expireYear"
            />
          </div>
        </div>
        <hr class="divide" />
        <div class="payment-footer-title">
          <div>Total price: &nbsp;</div>
          <div>{{ totalProductsPrice ? totalProductsPrice : 0 }}€</div>
        </div>

        <div class="ui-kit-modal-content-buttons">
          <button class="button button-grey full-width" type="submit">
            <span>Pay</span>
          </button>
        </div>
      </form>
    </template>
  </ui-kit-modal>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { useStore } from "~/store";
import axios from "axios";
import UiKitModal from "~/components/UiKit/UiKitModal.vue";
import UiKitInput from "../UiKit/UiKitInput.vue";
import useVuelidate from "@vuelidate/core";
import { storeToRefs } from "pinia";
import { required } from "@vuelidate/validators";
const store = useStore();
const serverErrors = ref({});
import { useCartStore } from "~~/store/cart";
const orderId = ref(null);

const cartStore = useCartStore();
const { totalProductsPrice, totalShippingPrice } = storeToRefs(cartStore);
const paymentForm = ref<InstanceType<typeof UiKitModal>>();
const stripe = reactive({
  cardNumber: null,
  expireMonth: null,
  cvc: null,
  expireYear: null,
});
const v$ = useVuelidate(
  {
    stripe: {
      cardNumber: { required },
      expireMonth: { required },
      cvc: { required },
      expireYear: { required },
    },
  },
  { stripe }
);

async function placeOrder() {
  v$.value.$touch();

  if (v$.value.$error) {
    return;
  }
  checkout();
  paymentForm.value && paymentForm.value?.close();
}
function open() {
  paymentForm.value && paymentForm.value?.open();
}
async function checkout() {
  const res = await axios.get("/checkout");
  await cartStore.getCarts();

  orderId.value = res?.data;
}
function close() {
  paymentForm.value && paymentForm.value?.close();
}

defineExpose({ open, close });
</script>
