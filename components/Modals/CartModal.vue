<template>
  <ui-kit-modal :title="'CART'" :with-footer="false" class="cart-modal" ref="cartForm">
    <template v-slot:content>
      <div class="ui-kit-cart-modal-content">
        <div class="modal-body">
          <div v-for="(cart, index) in artforaCarts" :key="index">
            <div class="cart-title">
              <span>{{ cart.title }}</span>
            </div>
            <div class="cart-item">
              <div class="cart-item-image">
                <img :src="getImageUrl(cart.media[0], ImageTemplate.Thumbnail)" :alt="cart.title"
                  class="cart-item-image-content">
                <span class="cart-item-delete" @click="deleteCart(cart?.id)">Delete product</span>
              </div>
              <div class="cart-item-lists">
                <div class="cart-item-list">
                  Price:
                  <span>{{ formattedNumber(cart?.price_in_euro) }} €</span>
                </div>
                <div class="cart-item-list">
                  Size 
                  <!-- <span class="cart-item-size"> (L/W/D) </span>: -->
                  <span
                    v-show="formattedNumber(cart.height) || formattedNumber(cart.width) || formattedNumber(cart.depth)">{{
                      formattedNumber(cart.height) || 0 }}/{{ formattedNumber(cart.width) || 0 }}/{{
    formattedNumber(cart.depth) || 0 }} cm</span>
                </div>
                <div class="cart-item-list">
                  Quantity:
                  <p>{{ cart.quantity || 1 }}</p>
                </div>
              </div>

            </div>
            <hr class="divide" >
          </div>
        </div>

      </div>
     
      <div class="carts-shipping">Shipping:&nbsp;
        <span>{{ formattedNumber(cart?.shippingPrice) || 0 }} €</span>
      </div>
      <div class="carts-total-price">Total: &nbsp;
        <span>{{ formattedNumber(totalPrice) || 0 }} €</span>
      </div>

      <div class="ui-kit-modal-content-buttons">
        <button class="button button-grey full-width" @click="close"><span>GO TO CHECKOUT</span></button>
      </div>
    </template>
  </ui-kit-modal>
</template>
  
<script setup lang="ts">
import { ref } from '@vue/reactivity'
import useMedia from '~/composable/media'
import { ImageTemplate } from '~/types/constants'
import UiKitModal from '~/components/UiKit/UiKitModal.vue'

const totalPrice = ref(0)
const artforaCarts = ref([])
const shippingPrice = ref(0)
const { getImageUrl } = useMedia()
const emit = defineEmits(['openCheckoutModal'])
const cartForm = ref<InstanceType<typeof UiKitModal>>(null)


function formattedNumber(amount: number) {
  const formattedNumber = amount?.toLocaleString('de-DE', {})
  return formattedNumber
}

function getPrices() {
  const storedCarts = JSON.parse(localStorage.getItem("artfora_carts") as string)
  artforaCarts.value = storedCarts
  let tPrice = ref(0)
  storedCarts?.map((cart: any) => { return tPrice.value += cart?.price_in_euro * cart?.quantity; })
  storedCarts?.map((cart: any) => { return shippingPrice.value += cart?.shippingPrice ?? 0; })

  totalPrice.value = tPrice.value + shippingPrice.value
}
function deleteCart(deletedCart: string) {
  const storedCarts = JSON.parse(localStorage.getItem("artfora_carts") as string)
  const result = storedCarts.filter((cart: any) => cart?.id !== deletedCart)
  localStorage.setItem('artfora_carts', JSON.stringify(result));
  artforaCarts.value = result
  getPrices()

}


function open() {
  getPrices()
  cartForm.value?.open()
}

function close() {
  cartForm.value?.close()
  emit("openCheckoutModal")
}
defineExpose({ open, close })
</script>