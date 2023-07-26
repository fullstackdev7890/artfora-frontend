<template>
  <ui-kit-sub-modal
    :title="'DELEVERY ADDRESS'"
    :with-footer="false"
    class="checkout-modal"
    :withHeader="false"
  >
    <template v-slot:content>
      <div class="ui-kit-checkout-modal-content">
        <div class="checkout-footer">
          <div class="checkout-footer-title">
            <div>Total all orders</div>
            <div>{{ totalProductsPrice ? formattedNumber(totalProductsPrice) : 0 }}€</div>
          </div>
          <ui-kit-check-box
            v-model="agreeCheckout"
            :value="'DELIVER ADDRESS (If different)'"
            :title="'I have read and accept all the legal shit.'"
            type="checkbox"
          />
        </div>
      </div>
      <div class="ui-kit-modal-content-buttons">
        <button
          class="button button-grey full-width"
          @click="openPayment"
          :disabled="!agreeCheckout"
        >
          <span>GO TO PAYMENT</span>
        </button>
      </div>
      <div class="ui-kit-modal-content-buttons">
        <button class="button button-grey full-width" @click="close">
          <span>CANCEL</span>
        </button>
      </div>
    </template>
  </ui-kit-sub-modal>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import axios from "axios";
import { useCartStore } from "~~/store/cart";
import { useUserStore } from "~/store/user";
import { storeToRefs } from "pinia";
const emit = defineEmits(["close", "openPaymentModal"]);
const userStore = useUserStore();
const currentProfile = storeToRefs(userStore);
const orderId = ref(null);
const agreeCheckout = ref(false);
const cartStore = useCartStore();
const { totalProductsPrice, totalShippingPrice } = storeToRefs(cartStore);
const user = reactive({
  id: currentProfile?.id,
});
const price = reactive({ totalProductsPrice: totalProductsPrice });
function formattedNumber(amount: number) {
  const formattedNumber = amount?.toLocaleString("de-DE", {});
  return formattedNumber;
}
async function checkout() {
  try {
    const res = await axios.get("/checkout");
    orderId.value = res?.data;
    const response = await axios.post(`/order_payment`, {
      order_id: orderId.value,
      amount: price.totalProductsPrice,
      user_id: user.id,
    });

    if (response.data.stripe_payment_url) {
      // window.open(response.data.stripe_payment_url);
      window.location.href = response.data.stripe_payment_url;
      await cartStore.getCarts();
    }
  } catch (error) {}
}
function openPayment() {
  checkout();
}
function close() {
  emit("close");
}
</script>
