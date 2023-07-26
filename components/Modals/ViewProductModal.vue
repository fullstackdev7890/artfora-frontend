<template>
  <ui-kit-modal
    title="View Product"
    :with-header="false"
    :with-footer="false"
    ref="viewProductModal"
    class="product-view-modal"
  >
    <template v-slot:content>
      <div class="product-container">
        <div class="product-container-btn">
          <NuxtLink class="product-container-btn-info" @click="toggleSidebar">
            <info v-show="!isShown" class="hide-icon" />
            <arrow-right v-show="isShown" class="hide-icon" />
          </NuxtLink>

          <NuxtLink class="product-container-btn-close" @click="close()">
            <close-icon class="close-icon" />
          </NuxtLink>
        </div>

        <div class="product-container-images">
          <img
            v-for="(image, index) in item.media"
            :key="index"
            v-show="index === currentImage && isFetched"
            :src="getImageUrl(image, ImageTemplate.FullSize)"
            :alt="tags"
            class="product-image"
          />

          <div
            class="product-container-images-next"
            v-show="currentImage + 1 < item.media.length"
            @click="toNextImage()"
          >
            <next-icon class="next-icon" />
          </div>

          <div
            class="product-container-images-prev"
            v-show="currentImage - 1 >= 0"
            @click="toPrevImage()"
          >
            <next-icon class="prev-icon" />
          </div>
        </div>

        <product-sidebar v-show="isShown" :product="item" :shipping="shippingRate"/>
      </div>
    </template>
  </ui-kit-modal>
</template>

<script setup lang="ts">
import UiKitModal from "~/components/UiKit/UiKitModal.vue";
import { useAsyncData, useRoute, useRouter } from "#app";
import { useProductsStore } from "~/store/products";
import { useAuthStore } from "~~/store/auth";
import { useUserStore } from "~~/store/user";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { ImageTemplate } from "~/types/constants";
import CloseIcon from "~/assets/svg/close.svg";
import ArrowRight from "~/assets/svg/arrow-right.svg";
import Info from "~/assets/svg/info.svg";
import ProductSidebar from "~/components/Products/ProductSidebar.vue";
import NextIcon from "../../assets/svg/next.svg";
import useMedia from "~/composable/media";
import randomWords from "random-words";
import axios from "axios";

const viewProductModal = ref<InstanceType<typeof UiKitModal>>(null);
const route = useRoute();
const router = useRouter();
const products = useProductsStore();
const authStore = useAuthStore();
const userStore = useUserStore();
const { isAuthorized } = storeToRefs(authStore);
const currentProfile = storeToRefs(userStore);
const { item } = storeToRefs(products);
const isShown = ref(false);
const currentImage = ref(0);
const { getImageUrl } = useMedia();
const isFetched = ref(false);
const shippingRate = ref(0);

onMounted(async () => {
  if (route.query && route.query.product) {
    open(Number(route.query.product));
  }

  checkScreenOrientation();
  window.addEventListener("orientationchange", checkScreenOrientation);
});

function toggleSidebar() {
  isShown.value = !isShown.value;
}

function toBack() {
  if (router.options.history.state.back) {
    router.go(-1);
  } else {
    router.push("/");
  }
}

function toNextImage() {
  currentImage.value = currentImage.value + 1;
}

function toPrevImage() {
  currentImage.value = currentImage.value - 1;
}

const tags = computed(() =>
  item.value.is_ai_safe
    ? item.value.tags
    : item.value.tags
    ? item.value.tags
    : randomWords(10).join(", ")
);

async function open(id: number) {
  isShown.value = false;
  await products.fetch(id.toString());

  isFetched.value = true;
  if (isAuthorized.value && item.value.user_id !== currentProfile.id.value) {
    const res = await axios.post("/ship_rate", {
      product_id: id,
      count: 1,
    });
    res.status === 200 && (shippingRate.value = res.data.message);
  }
  viewProductModal.value?.open();
  router.push(`/?product=${id}`);
}

function close() {
  viewProductModal.value?.close();
  // router.push({query: {}})
  if (router.options.history.state.back) {
    router.go(-1);
  } else {
    router.push("/");
  }
}
const screenOrientation = ref(true);

// beforeDestroy() {
//   window.removeEventListener('orientationchange', this.checkScreenOrientation);
// }

function checkScreenOrientation() {
  const isHorizontal = window.matchMedia("(orientation: landscape)").matches;

  screenOrientation.value = isHorizontal ? true : false;
}

defineExpose({ open, close });
</script>
