<template>
  <ui-kit-sub-modal
    :title="'DELEVERY ADDRESS'"
    :with-footer="false"
    :withHeader="true"
    class="checkout-modal"
  >
    <template v-slot:customHeader>
      <div class="ui-kit-box-cart-item">
        <div class="icon-button">
          <img
            :src="
              getUserAvatar(
                carts?.carts && carts?.carts[0]?.product?.user?.avatar_image,
                ImageTemplate.SmallThumbnail
              )
            "
            alt="user_avatar"
          />
        </div>
        <div class="cart-user-tag">
          <div class="username">
            {{ carts?.carts && carts?.carts[0]?.product?.user?.username }}
          </div>
          <div class="tagname">
            {{ carts?.carts && carts?.carts[0]?.product?.user?.tagname }}
          </div>
        </div>
      </div>
    </template>
    <template v-slot:content>
      <div class="ui-kit-checkout-modal-content">
        <div v-for="(cart, index) in carts?.carts" :key="index" class="cart-item-wrapper">
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
              <span class="cart-item-delete" @click="deleteCartItem(cart?.id)"
                >Delete product</span
              >
            </div>
            <div class="cart-item-lists">
              <!-- <div class="cart-item-list">
                Seller:

                <nuxt-link
                  :to="`/gallery/user/${cart?.product?.user?.username}`"
                  @click="() => byUsername(cart?.product?.user?.username)"
                  class="gallery-item-image-container-info-link"
                >
                  {{ cart?.product?.user?.username }}
                </nuxt-link>
              </div> -->
              <div class="cart-item-list">
                Price:
                <span>{{cart?.product.is_sale_price? formattedNumber(cart?.product?.sale_price_in_euro): formattedNumber(cart?.product?.price_in_euro) }} €</span>
              </div>
              <!-- <div class="cart-item-list">
                Shipping:
                <span>{{ formattedNumber(cart?.shipping) }} €</span>
              </div> -->
              <div class="cart-item-list">
                Length
                <span
                  v-show="
                    formattedNumber(cart?.product?.height || 0)
                  "
                  >{{ formattedNumber(cart?.product?.height || 0) }} cm</span>
              </div>
              <div class="cart-item-list">
                Width
                <span
                  v-show="
                    formattedNumber(cart?.product?.width || 0)
                  "
                  >{{ formattedNumber(cart?.product?.width || 0) }} cm</span>
              </div>
              <div class="cart-item-list">
                Depth
                <span
                  v-show="
                    formattedNumber(cart?.product?.depth || 0)
                  "
                  >{{ formattedNumber(cart?.product?.depth || 0) }} cm</span>
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

      <!-- <div class="carts-shipping">Shipping:&nbsp;
        <span>{{ formattedNumber(totalShippingPrice) || 0 }} €</span>
      </div> -->
      <div class="carts-total-sub-price">
        Shipping: &nbsp;
        <span>{{ formattedNumber(carts.total_shipping) || 0 }} €</span>
      </div>
      <div
        class="carts-total-sub-price"
        :style="{ color: 'white', fontSize: 18, paddingTop: '0.3rem' }"
      >
        Total: &nbsp;
        <span
          >{{ formattedNumber(carts.total_price) || 0 }} €</span
        >
      </div>
    </template>
  </ui-kit-sub-modal>
</template>

<script setup lang="ts">
import useMedia from "~/composable/media";
import { useCartStore } from "~~/store/cart";
import { useProductsStore } from "~/store/products";

import { ImageTemplate } from "~/types/constants";
import { useCategoriesStore } from "~/store/categories";
interface Props {
  carts: any;
}
const cartStore = useCartStore();
const categoriesStore = useCategoriesStore();
const productsStore = useProductsStore();
const { getImageUrl } = useMedia();
const { getUserAvatar } = useMedia();
const props = withDefaults(defineProps<Props>(), {
  carts: { carts: [], total_price: 0, total_shipping: 0, user_id: 0 },
});

function formattedNumber(amount: number) {
  const formattedNumber = amount?.toLocaleString("de-DE", {});
  return formattedNumber;
}
async function deleteCart(deletedCart: number) {
  await cartStore.deleteCart(deletedCart);
  await cartStore.getCarts();
}
function deleteCartItem(id: number) {
  deleteCart(id);
}
async function byUsername(username: string) {
  await categoriesStore.updateFilter({ username: username, author: null });
  await productsStore.updateFilter({ username: username, author: null });
  await categoriesStore.fetch();
}
</script>
