<template>
  <div
    class="gallery"
    ref="galleryComponentRef"
    v-if="
      !(diffDays > 7 && seller_support === true) ||
      !(buyer_support === true && diffDays < 7)
    "
  >
    <div
      v-for="(column, index) in galleryImages"
      :key="index"
      class="col-20 col-large-25 col-laptop-33 col-tab-50"
      :class="{
        'col-mobile-100':
          galleryViewType === LARGE_GALLERY_VIEW_TYPE ||
          galleryViewType === DETAILS_GALLERY_VIEW_TYPE,
        'col-mobile-50': galleryViewType === JUSTIFIED_GALLERY_VIEW_TYPE,
        'col-mobile-33': galleryViewType === SQUARE_GALLERY_VIEW_TYPE,
      }"
    >
      <nuxt-link
        v-for="(image, index) in column"
        :key="index"
        @click.prevent="(event) => clickProduct(event, image.id)"
        class="gallery-item"
      >
        <div
          class="gallery-item-image-container"
          :class="{
            'gallery-item-image-container-large':
              galleryViewType === LARGE_GALLERY_VIEW_TYPE,
            'gallery-item-image-container-justified':
              galleryViewType === JUSTIFIED_GALLERY_VIEW_TYPE,
            'gallery-item-image-container-square':
              galleryViewType === SQUARE_GALLERY_VIEW_TYPE,
            'gallery-item-image-container-details':
              galleryViewType === DETAILS_GALLERY_VIEW_TYPE,
          }"
        >
          <product-info
            v-if="image?.user"
            :product="image"
            @open-edit-product-modal="editProductModalRef.open()"
            @open-view-product-modal="(id) => openViewProductModal(id)"
          />

          <user-details
            v-if="galleryViewType === DETAILS_GALLERY_VIEW_TYPE"
            :username="image.user.username"
            :author="image.author"
            :author-tag="image.user.tagname"
            :author-avatar="image.user.avatar_image"
          />
          <img
            :class="
              (!isAuthorized && image?.visibility_level > 1) ||
              (isAuthorized && image?.visibility_level > product_visibility_level)
                ? 'blur-image'
                : ''
            "
            :src="getImageUrl(image.media[0], ImageTemplate.Thumbnail)"
            :alt="getTags(image)"
          />
        </div>
      </nuxt-link>
    </div>

    <edit-product-modal ref="editProductModalRef" />
    <view-product-modal ref="viewProductModalRef" />
  </div>
</template>

<script setup lang="ts">
import {
  LARGE_GALLERY_VIEW_TYPE,
  SQUARE_GALLERY_VIEW_TYPE,
  DETAILS_GALLERY_VIEW_TYPE,
  MOBILE_WIDTH,
  TABLET_WIDTH,
  LAPTOP_WIDTH,
  LARGE_WIDTH,
  JUSTIFIED_GALLERY_VIEW_TYPE,
  ProductsState,
} from "~/types/products";
import { onMounted, onUnmounted, watch } from "vue";
import { Product } from "~/types/products";
import { ref } from "@vue/reactivity";
import { useAuthStore } from "~/store/auth";
import { useUserStore } from "~/store/user";
import { useProductsStore } from "~/store/products";
import { Paginated } from "~/types/search";
import { useSettingsGalleryStore } from "~/store/gallerySettings";
import { storeToRefs } from "pinia";
import { ImageTemplate } from "~/types/constants";
import UserDetails from "~/components/Gallery/UserDetails.vue";
import useMedia from "~/composable/media";
import ProductInfo from "~/components/Gallery/ProductInfo.vue";
import randomWords from "random-words";
import EditProductModal from "~/components/Modals/EditProductModal.vue";
import ViewProductModal from "~/components/Modals/ViewProductModal.vue";

const { getImageUrl } = useMedia();
const authStore = useAuthStore();
const { isAuthorized } = storeToRefs(authStore);
const userStore = useUserStore();
const {
  product_visibility_level,
  buyer_support,
  seller_support,
  created_at,
} = storeToRefs(userStore);
const galleryComponentRef = ref(null);
const galleryImages = ref([]);
const products = useProductsStore();
const gallerySettings = useSettingsGalleryStore();
const { viewType } = storeToRefs(gallerySettings);
const galleryViewType = ref(viewType);
const router = useRouter();
const editProductModalRef = ref<InstanceType<typeof EditProductModal>>(null);
const viewProductModalRef = ref<InstanceType<typeof ViewProductModal>>(null);

interface Props {
  items: ProductsState;
}

const props = withDefaults(defineProps<Props>(), {
  items: () => {},
});

watch(
  () => props.items,
  (newItems) => {
    sortImagesByColumns(newItems.data);
  }
);
const createdAtDate = created_at?.value ? new Date(created_at.value.toString()) : null;

const now = new Date();

const diffTime = now.getTime() - createdAtDate?.getTime();
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

function loadNextPage(data: Paginated<Product>) {
  if (data.current_page === data.last_page) {
    return;
  }

  let element = galleryComponentRef.value;

  if (
    element.getBoundingClientRect().bottom < window.innerHeight &&
    !products.loadingNextPage
  ) {
    const nextPage = data.current_page + 1;
    products.updateFilter({ page: nextPage });
    products.fetchNextPage();
  }
}
function scrollListener() {
  loadNextPage(props.items);
}

function sortImagesListener() {
  sortImagesByColumns(props.items.data);
}

onMounted(async () => {
  if (process.client) {
    sortImagesByColumns(props.items.data);

    window.addEventListener("resize", sortImagesListener);

    window.addEventListener("scroll", scrollListener);
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", sortImagesListener);

  window.removeEventListener("scroll", scrollListener);
});

function getColumnsCount() {
  if (!process.client) {
    return 1;
  }

  const vType: "large" | "justified" | "square" | "details" = galleryViewType.value;
  const galleryColumns = {
    [LARGE_GALLERY_VIEW_TYPE]: 1,
    [JUSTIFIED_GALLERY_VIEW_TYPE]: 2,
    [SQUARE_GALLERY_VIEW_TYPE]: 3,
    [DETAILS_GALLERY_VIEW_TYPE]: 1,
  };
  let mobileColumnCount = galleryColumns[vType];

  const columnsCounts = {
    [MOBILE_WIDTH]: 2,
    [TABLET_WIDTH]: 3,
    [LAPTOP_WIDTH]: 4,
    [LARGE_WIDTH]: 5,
  };

  return Object.entries(columnsCounts).reduce(
    (result, [size, columns]) => (window.innerWidth > size ? columns : result),
    mobileColumnCount
  );
}

function openViewProductModal(id: number) {
  const allowedProduct = products.items.data.find((product) => {
    if (
      product.id === id &&
      (product.visibility_level === 1 ||
        (product_visibility_level.value &&
          product.visibility_level <= product_visibility_level.value))
    ) {
      return true;
    }
  });
  allowedProduct && viewProductModalRef.value.open(id);
}

function clickProduct(event: Event, id: number) {
  if (
    ["path", "svg", "button", "a"].includes(
      (event.target as HTMLElement).tagName.toLowerCase()
    )
  ) {
    return;
  }
  openViewProductModal(id);
}

function sortImagesByColumns(images: Product[]) {
  const columnsCount = getColumnsCount();

  galleryImages.value = Array(columnsCount)
    .fill()
    .map(() => []);

  let currentColumn = 0;

  images.forEach((item: Product) => {
    galleryImages.value[currentColumn].push(item);

    currentColumn++;

    if (currentColumn >= galleryImages.value.length) {
      currentColumn = 0;
    }
  });
}

const getTags = (product: Product) =>
  product.is_ai_safe
    ? product.tags
    : product.tags
    ? product.tags
    : randomWords(10).join(", ");
</script>
