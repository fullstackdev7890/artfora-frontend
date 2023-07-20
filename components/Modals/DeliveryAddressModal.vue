<template>
  <ui-kit-sub-modal
    :title="'DELEVERY ADDRESS'"
    :with-footer="false"
    :withHeader="true"
    class="checkout-modal"
  >
    <template v-slot:customHeader>
      <h5>DELIVERY ADDRESS</h5>
    </template>
    <template v-slot:content>
      <div class="ui-kit-checkout-modal-content">
        <div class="checkout-section" v-if="user?.dev_email">
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
              {{ user?.dev_postal }}{{ user?.dev_city }}
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
          <div class="ui-kit-modal-content-buttons">
            <button class="button button-grey full-width" @click="goToBuyerSettingModal">
              <span>EDIT ADDRESS</span>
            </button>
          </div>
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
  dev_name: currentProfile?.dev_name,
  dev_email: currentProfile?.dev_email,
  dev_address: currentProfile?.dev_address,
  dev_address2: currentProfile?.dev_address2,
  dev_postal: currentProfile?.dev_postal,
  dev_state: currentProfile?.dev_state,
  dev_city: currentProfile?.dev_city,
  dev_country: currentProfile?.dev_country,
  dev_phone: currentProfile?.dev_phone,
  dev_att: currentProfile?.dev_att,
});

function goToBuyerSettingModal() {
  emit("goToBuyerSettingModal");
}
</script>
