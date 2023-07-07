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
      <div class="sub-modal" v-if="user.dev_email">
        <delivery-address-modal
          :user="user"
          @goToBuyerSettingModal="goToBuyerSettingModal"
        ></delivery-address-modal>
      </div>
      <div class="sub-modal">
        <go-to-payment-modal
          @close="close"
        ></go-to-payment-modal>
          <!-- @openPaymentModal="openPaymentModal" -->
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
const { totalProductsPrice, totalShippingPrice } = storeToRefs(cartStore);

const user = reactive({
  id: currentProfile?.id,
  username: currentProfile.username,
  email: currentProfile.email,
  description: currentProfile.description,
  external_link: currentProfile.external_link,
  product_visibility_level: currentProfile.product_visibility_level,
  background_image_id: currentProfile.background_image_id,
  avatar_image_id: currentProfile.avatar_image_id,
  country: currentProfile.country,
  more_external_link: currentProfile.more_external_link,
  can_add_product: currentProfile?.can_add_product,
  inv_name: currentProfile?.inv_name,
  inv_email: currentProfile?.inv_email,
  inv_address: currentProfile?.inv_address,
  inv_address2: currentProfile?.inv_address2,
  inv_zip: currentProfile?.inv_zip,
  inv_state: currentProfile?.inv_state,
  inv_city: currentProfile?.inv_city,
  inv_country: currentProfile?.inv_country,
  inv_phone: currentProfile?.inv_phone,
  inv_att: currentProfile?.inv_att,
  dev_name: currentProfile?.dev_name,
  dev_email: currentProfile?.dev_email,
  dev_address: currentProfile?.dev_address,
  dev_address2: currentProfile?.dev_address2,
  dev_zip: currentProfile?.dev_zip,
  dev_state: currentProfile?.dev_state,
  dev_city: currentProfile?.dev_city,
  dev_country: currentProfile?.dev_country,
  dev_phone: currentProfile?.dev_phone,
  dev_att: currentProfile?.dev_att,
  sel_name: currentProfile?.sel_name,
  sel_email: currentProfile?.sel_email,
  sel_address: currentProfile?.sel_address,
  sel_address2: currentProfile?.sel_address2,
  sel_zip: currentProfile?.sel_zip,
  sel_state: currentProfile?.sel_state,
  sel_city: currentProfile?.sel_city,
  sel_country: currentProfile?.sel_country,
  sel_phone: currentProfile?.sel_phone,
  sel_att: currentProfile?.sel_att,
});

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
