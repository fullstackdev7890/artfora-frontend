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
          <span>CONTINUE TO CHECKOUT</span>
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
import UiKitModal from "~/components/UiKit/UiKitModal.vue";
import { useCartStore } from "~~/store/cart";
import { useUserStore } from "~/store/user";
import { storeToRefs } from "pinia";
const emit = defineEmits(["close", "openPaymentModal"]);
const userStore = useUserStore();
const checkoutForm = ref<InstanceType<typeof UiKitModal>>();

const agreeCheckout = ref(false);
const cartStore = useCartStore();
const { totalProductsPrice, totalShippingPrice } = storeToRefs(cartStore);
function formattedNumber(amount: number) {
  const formattedNumber = amount?.toLocaleString("de-DE", {});
  return formattedNumber;
}
function openPayment() {
  console.log("payment modal");
  emit("close");
  emit("openPaymentModal");
}
function close() {
  emit("close");
}
</script>
