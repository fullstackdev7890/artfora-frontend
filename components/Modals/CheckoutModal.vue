<template>
  <ui-kit-modal
    :title="'CHECKOUT'"
    :with-footer="false"
    class="checkout-modal"
    ref="checkoutForm"
  >
    <template v-slot:content>
      <div class="ui-kit-checkout-modal-content">
      </div>
      <div class="ui-kit-modal-content-buttons">
        <button class="button button-grey full-width" @click="close">
          <span>PLACE ORDER</span>
        </button>
      </div>
    </template>
  </ui-kit-modal>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import axios from "axios";
import UiKitModal from "~/components/UiKit/UiKitModal.vue";
import { useCartStore } from "~~/store/cart";

const checkoutForm = ref<InstanceType<typeof UiKitModal>>(null);
const emit = defineEmits(["openCheckoutModal"]);
const orderId = ref(null);

const cartStore = useCartStore();
function open() {
  async function checkout() {
    const res = await axios.get("/checkout");
    orderId.value = res?.data;
  }
  checkout();

  checkoutForm.value?.open();
}

function close() {
  axios.post("order_payment");
  checkoutForm.value?.close();
  emit("openCheckoutModal");
}

defineExpose({ open, close });
</script>
