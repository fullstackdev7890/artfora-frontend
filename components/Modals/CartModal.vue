<template>
  <ui-kit-modal :title="'CART'" :with-footer="false" class="cart-modal" ref="cartForm">
    <template v-slot:content>
      <div class="ui-kit-cart-modal-content">
        <div>
          <div v-for="(cart, index) in carts" :key="index">
            <div class="cart-title">
              <span>{{ cart.title }}</span>
            </div>
            <div class="cart-item">
              <div class="cart-item-image">
                <img :src="getImageUrl(cart?.media[0], ImageTemplate.Thumbnail)" :alt="cart.title"
                  class="cart-item-image-content">
                <span class="cart-item-delete" @click="deleteCart(cart?.id)">Delete product</span>
              </div>
              <div class="cart-item-lists">
                <div class="cart-item-list">
                  Seller:
                  <span>{{ cart?.seller?.name }}</span>
                </div>
                <div class="cart-item-list">
                  Price:
                  <span>{{ formattedNumber(cart?.price_in_euro) }} €</span>
                </div>
                <div class="cart-item-list">
                  Size
                  <!-- <span class="cart-item-size"> (L/W/D) </span>: -->
                  <span
                    v-show="formattedNumber(cart.height || 0) || formattedNumber(cart.width || 0) || formattedNumber(cart.depth || 0)">{{
                      formattedNumber(cart.height || 0) }}/{{ formattedNumber(cart.width || 0) }}/{{
    formattedNumber(cart.depth || 0) }} cm</span>
                </div>
                <div class="cart-item-list">
                  Quantity:
                  <p>{{ cart.quantity || 1 }}</p>
                </div>
              </div>

            </div>
            <hr class="divide">
          </div>
        </div>

      </div>

      <!-- <div class="carts-shipping">Shipping:&nbsp;
        <span>{{ formattedNumber(totalShippingPrice) || 0 }} €</span>
      </div> -->
      <div class="carts-total-price">Total: &nbsp;
        <span>{{ formattedNumber(totalProductsPrice) || 0 }} €</span>
      </div>

      <div class="ui-kit-modal-content-buttons">
        <button class="button button-grey full-width" @click="close" :disabled="carts.length > 0"><span>GO TO
            CHECKOUT</span></button>
      </div>
    </template>
  </ui-kit-modal>
</template>
  
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from '@vue/reactivity'
import useMedia from '~/composable/media'
import { useCartStore } from '~~/store/cart'
import { ImageTemplate } from '~/types/constants'
import UiKitModal from '~/components/UiKit/UiKitModal.vue'


const cartStore = useCartStore()
const { carts, totalProductsPrice, totalShippingPrice } = storeToRefs(cartStore)

const { getImageUrl } = useMedia()
const emit = defineEmits(['openCheckoutModal'])
const cartForm = ref<InstanceType<typeof UiKitModal>>()


function formattedNumber(amount: number) {
  const formattedNumber = amount?.toLocaleString('de-DE', {})
  return formattedNumber
}

async function deleteCart(deletedCart: number) {
  await cartStore.deleteCart(deletedCart)
  await cartStore.getCarts()


}

function open() {
  cartStore.getCarts()
  cartForm.value?.open()
}

function close() {
  cartForm.value?.close()
  emit("openCheckoutModal")
}
defineExpose({ open, close })
</script>