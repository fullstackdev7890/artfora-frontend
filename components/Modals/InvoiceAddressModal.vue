<template>
  <ui-kit-sub-modal :with-footer="false" class="checkout-modal" :withHeader="true">
    <template v-slot:customHeader>
      <h5>INVOICE ADDRESS</h5>
    </template>
    <template v-slot:content>
      <div class="ui-kit-checkout-modal-content">
        <div class="checkout-section">
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
        <div class="ui-kit-modal-content-buttons">
          <button class="button button-grey full-width" @click="goToBuyerSettingModal">
            <span>EDIT ADDRESS</span>
          </button>
        </div>
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

const userStore = useUserStore();
const currentProfile = storeToRefs(userStore);
const checkoutForm = ref<InstanceType<typeof UiKitModal>>();

const emit = defineEmits(["goToBuyerSettingModal"]);

const cartStore = useCartStore();
const { totalProductsPrice, totalShippingPrice } = storeToRefs(cartStore);

const user = reactive({
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
});

function goToBuyerSettingModal() {
  emit("goToBuyerSettingModal");
}
</script>
