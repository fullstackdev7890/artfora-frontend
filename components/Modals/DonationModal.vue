<template>
    <ui-kit-modal :title="'Add Product'" :with-footer="false" class="artfora-modal popup--product" ref="donationModalRef">
        <template v-slot:content>
            <div class="product--popup">
                <div class="product--list-div">
                    <p>Db > texts > support_1</p>
                </div>

                <div class="product--list-div">
                    <p>Db > texts > support_2</p>
                    <div class="input--field--product">
                        <div>
                            <input type="number" v-model="donationAmount" /> <span>&euro;</span>
                        </div>
                        <div>
                            <button class="button button-grey full-width" @click="handleDonationClick(donationAmount)">
                                <span>Donate</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="product--list-div">
                    <p>Db > texts > support_3</p>
                    <div class="input--field--product">
                        <div>
                            <input type="number" v-model="subscriptionAmount" /> <span>&euro;</span>
                        </div>
                        <div>
                            <button class="button button-grey full-width" @click="handleSubscribeClick(subscriptionAmount)">
                                <span>Subscribe</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ui-kit-modal-content-buttons">
                <button class="button button-grey full-width" @click="close">
                    <span>Close</span>
                </button>
            </div>
        </template>
    </ui-kit-modal>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import UiKitModal from "~/components/UiKit/UiKitModal.vue";
import About from "~/components/Users/About.vue";
import { useTextsStore } from "~/store/texts";
import { handleDonationClick, handleSubscribeClick } from "../../store/donation"

const textsStore = useTextsStore();
const donationModalRef = ref<InstanceType<typeof UiKitModal>>();
const sellerSupportTexts = computed(() => textsStore?.getSellerSupport());

const donationAmount = ref<number>(0);
const subscriptionAmount = ref<number>(0);

function open() {
    donationModalRef.value && donationModalRef.value?.open();
}

function close() {
    donationModalRef.value && donationModalRef.value?.close();
}

defineExpose({ open, close });
</script>
