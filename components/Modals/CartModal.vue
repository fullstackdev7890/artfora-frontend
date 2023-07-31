<template>
  <ui-kit-modal-container
    :title="'CHECKOUT'"
    :with-footer="false"
    class="checkout-modal"
    ref="cartModalRef"
  >
    <template v-slot:content>
      <div class="sub-modal" v-for="(cart, index) in carts" :key="index">
        <cart-item-modal :carts="cart" @close-cart-modal="close"></cart-item-modal>
      </div>
      <div class="sub-modal">
        <continue-to-checkout-modal
          @close="close"
          @openCheckoutModal="openCheckoutModal"
        ></continue-to-checkout-modal>
      </div>
    </template>
  </ui-kit-modal-container>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "@vue/reactivity";
import { useCartStore } from "~~/store/cart";

import UiKitModalContainer from "~/components/UiKit/UiKitModalContainer.vue";
import ContinueToCheckoutModal from "~/components/Modals/ContinueToCheckoutModal.vue";
import CartItemModal from "~/components/Modals/CartItemModal.vue";
const cartStore = useCartStore();
const { carts, totalProductsPrice, totalShippingPrice } = storeToRefs(cartStore);

const emit = defineEmits(["openCheckoutModal"]);
const cartModalRef = ref<InstanceType<typeof UiKitModalContainer>>();

function openCheckoutModal() {
  emit("openCheckoutModal");
}

function open() {
  cartModalRef.value?.open();
}
function close() {
  cartStore.getCarts();
  cartModalRef.value?.close();
}
defineExpose({ open, close });
</script>
