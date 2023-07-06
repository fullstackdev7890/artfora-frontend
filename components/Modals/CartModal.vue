<template>
  <ui-kit-modal :title="'CART'" :with-footer="false" class="cart-modal" ref="cartForm">
    <template v-slot:content>
      <div class="ui-kit-cart-modal-content">
        <div>
          <div v-for="(cart, index) in carts" :key="index">
            <div class="cart-title">
              <span>{{ cart?.product?.title }}</span>
            </div>
            <div class="cart-item">
              <div class="cart-item-image">
                <img
                  :src="getImageUrl(cart?.product?.media[0], ImageTemplate.Thumbnail)"
                  :alt="cart?.prod_title"
                  class="cart-item-image-content"
                />
                <span class="cart-item-delete" @click="deleteCart(cart?.id)"
                  >Delete product</span
                >
              </div>
              <div class="cart-item-lists">
                <div class="cart-item-list">
                  Seller:

                  <nuxt-link
                    :to="`/gallery/user/${cart?.product?.user?.username}`"
                    @click="() => byUsername(cart?.product?.user?.username)"
                    class="gallery-item-image-container-info-link"
                  >
                    {{ cart?.product?.user?.username }}
                  </nuxt-link>
                </div>
                <div class="cart-item-list">
                  Price:
                  <span>{{ formattedNumber(cart?.product?.price_in_euro) }} €</span>
                </div>
                <div class="cart-item-list">
                  Shipping:
                  <span>{{ formattedNumber(cart?.shipping) }} €</span>
                </div>
                <div class="cart-item-list">
                  Size
                  <!-- <span class="cart-item-size"> (L/W/D) </span>: -->
                  <span
                    v-show="
                      formattedNumber(cart?.product?.height || 0) ||
                      formattedNumber(cart?.product?.width || 0) ||
                      formattedNumber(cart?.product?.depth || 0)
                    "
                    >{{ formattedNumber(cart?.product?.height || 0) }}/{{
                      formattedNumber(cart?.product?.width || 0)
                    }}/{{ formattedNumber(cart?.product?.depth || 0) }} cm</span
                  >
                </div>
                <div class="cart-item-list">
                  Quantity:
                  <p>{{ cart.quantity || 1 }}</p>
                </div>
              </div>
            </div>
            <hr class="divide" />
          </div>
        </div>
      </div>

      <!-- <div class="carts-shipping">Shipping:&nbsp;
        <span>{{ formattedNumber(totalShippingPrice) || 0 }} €</span>
      </div> -->
      <div class="carts-total-sub-price">
        Shipping: &nbsp;
        <span>{{ formattedNumber(totalShippingPrice) || 0 }} €</span>
      </div>
      <div class="carts-total-sub-price">
        Product Price: &nbsp;
        <span>{{ formattedNumber(totalProductsPrice) || 0 }} €</span>
      </div>
      <div class="carts-total-price">
        Total Price: &nbsp;
        <span
          >{{
            formattedNumber(totalShippingPrice + totalProductsPrice) || 0 || 0
          }}
          €</span
        >
      </div>

      <div class="ui-kit-modal-content-buttons">
        <button
          class="button button-grey full-width"
          @click="close"
          :disabled="carts?.length === 0"
        >
          <span>GO TO CHECKOUT</span>
        </button>
      </div>
    </template>
  </ui-kit-modal>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "@vue/reactivity";
import useMedia from "~/composable/media";
import { useCartStore } from "~~/store/cart";
import { useProductsStore } from "~/store/products";

import { ImageTemplate } from "~/types/constants";
import UiKitModal from "~/components/UiKit/UiKitModal.vue";
import { useCategoriesStore } from "~/store/categories";

const cartStore = useCartStore();
const { carts, totalProductsPrice, totalShippingPrice } = storeToRefs(cartStore);
const { getImageUrl } = useMedia();
const emit = defineEmits(["openCheckoutModal"]);
const cartForm = ref<InstanceType<typeof UiKitModal>>();
const categoriesStore = useCategoriesStore();
const productsStore = useProductsStore();

async function byUsername(username: string) {
  await categoriesStore.updateFilter({ username: username, author: null });
  await productsStore.updateFilter({ username: username, author: null });
  await categoriesStore.fetch();
}

function formattedNumber(amount: number) {
  const formattedNumber = amount?.toLocaleString("de-DE", {});
  return formattedNumber;
}

async function deleteCart(deletedCart: number) {
  await cartStore.deleteCart(deletedCart);
  await cartStore.getCarts();
}

function open() {
  cartForm.value?.open();
}
function close() {
  cartStore.getCarts();
  cartForm.value?.close();
  emit("openCheckoutModal");
}
defineExpose({ open, close });
</script>
