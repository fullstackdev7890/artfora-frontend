<template>
  <ui-kit-modal
    :title="'CHECKOUT'"
    :with-footer="false"
    class="checkout-modal"
    ref="checkoutForm"
  >
    <template v-slot:content>
      <div class="ui-kit-checkout-modal-content">
        <div class="checkout-section">
          <div class="checkout-section-header">
            <span class="checkout-section-title"> Invoice address </span>
            <div class="checkout-section-edit-icon">
              <Icon_Edit @click="goToBuyerSettingModal" />
            </div>
          </div>
          <div class="checkout-list">
            <div class="checkout-list-title">Name:</div>
            <div class="checkout-list-content">{{ user?.inv_name }}</div>
          </div>
          <div class="checkout-list">
            <div class="checkout-list-title">Address:</div>
            <div class="checkout-list-content">{{ user?.inv_address }}</div>
          </div>
          <div class="checkout-list" v-if="user?.inv_address2">
            <div class="checkout-list-title">Address2:</div>
            <div class="checkout-list-content">{{ user?.inv_address2 }}</div>
          </div>
          <div class="checkout-list" v-if="user?.inv_state">
            <div class="checkout-list-title">State:</div>
            <div class="checkout-list-content">{{ user?.inv_state }}</div>
          </div>
          <div class="checkout-list">
            <div class="checkout-list-title">Zip/City:</div>
            <div class="checkout-list-content">
              {{ user?.inv_zip }}{{ user?.inv_city }}
            </div>
          </div>
          <div class="checkout-list">
            <div class="checkout-list-title">Phone:</div>
            <div class="checkout-list-content">{{ user?.inv_phone }}</div>
          </div>
          <div class="checkout-list">
            <div class="checkout-list-title">Email Address:</div>
            <div class="checkout-list-content">{{ user?.inv_email }}</div>
          </div>
          <div class="checkout-list" v-if="user?.inv_att">
            <div class="checkout-list-title">Attention:</div>
            <div class="checkout-list-content">{{ user?.inv_att }}</div>
          </div>
        </div>
        <div class="checkout-section" v-if="user?.dev_email">
          <div class="checkout-section-header">
            <span class="checkout-section-title"> Delivery address </span>
            <div class="checkout-section-edit-icon">
              <Icon_Edit @click="goToBuyerSettingModal" />
            </div>
          </div>
          <div class="checkout-list">
            <div class="checkout-list-title">Name:</div>
            <div class="checkout-list-content">{{ user?.dev_name }}</div>
          </div>
          <div class="checkout-list">
            <div class="checkout-list-title">Address:</div>
            <div class="checkout-list-content">{{ user?.dev_address }}</div>
          </div>
          <div class="checkout-list" v-if="user?.dev_address2">
            <div class="checkout-list-title">Address2:</div>
            <div class="checkout-list-content">{{ user?.dev_address2 }}</div>
          </div>
          <div class="checkout-list" v-if="user?.dev_state">
            <div class="checkout-list-title">State:</div>
            <div class="checkout-list-content">{{ user?.dev_state }}</div>
          </div>
          <div class="checkout-list">
            <div class="checkout-list-title">Zip/City:</div>
            <div class="checkout-list-content">
              {{ user?.dev_zip }}{{ user?.dev_city }}
            </div>
          </div>
          <div class="checkout-list">
            <div class="checkout-list-title">Phone:</div>
            <div class="checkout-list-content">{{ user?.dev_phone }}</div>
          </div>
          <div class="checkout-list">
            <div class="checkout-list-title">Email Address:</div>
            <div class="checkout-list-content">{{ user?.dev_email }}</div>
          </div>
          <div class="checkout-list" v-if="user?.dev_att">
            <div class="checkout-list-title">Attention:</div>
            <div class="checkout-list-content">{{ user?.dev_att }}</div>
          </div>
        </div>
        <hr class="divide" />
        <div class="checkout-footer">
          <div class="checkout-footer-title">
            <div>Total all orders</div>
            <div>{{ totalProductsPrice ? totalProductsPrice : 0 }}€</div>
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
          @click="close"
          :disabled="!agreeCheckout"
        >
          <span>GO TO PAYMENT</span>
        </button>
      </div>
    </template>
  </ui-kit-modal>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import axios from "axios";
import UiKitModal from "~/components/UiKit/UiKitModal.vue";
import UiKitCheckBox from "../UiKit/UiKitCheckBox.vue";
import DeliveryAddressModal from "./DeliveryAddressModal.vue";
import { useCartStore } from "~~/store/cart";
import { useUserStore } from "~/store/user";
import { storeToRefs } from "pinia";
import Icon_Edit from "~/assets/svg/icon_edit.svg";

const userStore = useUserStore();
const agreeCheckout = ref(false);
const currentProfile = storeToRefs(userStore);
const checkoutForm = ref<InstanceType<typeof UiKitModal>>();

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
  emit("openPaymentModal");
}

defineExpose({ open, close });
</script>
