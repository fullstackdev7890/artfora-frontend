<template>
  <ui-kit-modal-container
    :title="'CHECKOUT'"
    :with-footer="false"
    class="checkout-modal"
    ref="checkoutForm"
  >
    <template v-slot:content>
      <div class="sub-modal">
        <invoice-address-modal
          :user="user"
          @goToBuyerSettingModal="goToBuyerSettingModal"
        ></invoice-address-modal>
      </div>
      <div class="sub-modal">
        <continue-to-checkout-modal></continue-to-checkout-modal>
      </div>
    </template>
  </ui-kit-modal-container>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import UiKitModal from "~/components/UiKit/UiKitModal.vue";
import DeliveryAddressModal from "./DeliveryAddressModal.vue";
import { useCartStore } from "~~/store/cart";
import { useUserStore } from "~/store/user";
import { storeToRefs } from "pinia";
import UiKitModalContainer from "~/components/UiKit/UiKitModalContainer.vue";
import InvoiceAddressModal from "~/components/Modals/InvoiceAddressModal.vue";
import GoToPaymentModal from "~/components/Modals/GoToPaymentModal.vue";
import ContinueToCheckoutModal from "~/components/Modals/ContinueToCheckoutModal.vue";

const userStore = useUserStore();
const currentProfile = storeToRefs(userStore);
const checkoutForm = ref<InstanceType<typeof UiKitModalContainer>>();

const emit = defineEmits([
  "openCheckoutModal",
  "openSetUpAccountProfileModal",
  "openSetUpAccountBuyerModal",
  "openPaymentModal",
]);

const cartStore = useCartStore();
const { carts, totalProductsPrice, totalShippingPrice } = storeToRefs(cartStore);

function goToBuyerSettingModal() {
  emit("openSetUpAccountBuyerModal");
}
function open() {
  checkoutForm.value?.open();
}

function close() {
  checkoutForm.value?.close();
}
function openPaymentModal() {
  emit("openPaymentModal");
}

defineExpose({ open, close });
</script>
