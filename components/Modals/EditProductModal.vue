<template>
  <ui-kit-modal title="Edit Product" :with-header="false" :with-footer="false" ref="editProductModal">
    <template v-slot:customHeader>
      <header class="edit-product-header">
        <trash-icon @click="deleteProductModalRef.open()" class="trash-icon ui-kit-box-tools-link trash-icon" />
        <h5>Edit Product</h5>
        <div class="edit-product-header-tools">
          <close-icon @click="close()" class="close-icon ui-kit-box-tools-link" />
        </div>
      </header>
    </template>

    <template v-slot:content>
      <form @submit.prevent="updateProduct()">
        <div class="add-product">
          <div class="add-product-upload">
            <label for="uploadImage" class="add-product-upload-add">
              DROP IMAGE(S) HERE <br />
              OR CLICK TO BROWSE <br />
              MINIMUM WIDTH 1920 PX <br />
              AND MAX 5MB <br />
              <input id="uploadImage" @change="addFiles($event)" accept="image/bmp, image/png, image/jpeg" type="file"
                ref="file" multiple />
            </label>

            <div class="add-product-upload-images">
              <vue-draggable-next :list="files" @change="sortFiles()" class="add-product-upload-images-draggable">
                <div v-if="files.length !== 0" v-for="(image, index) in files" :key="image.id"
                  class="add-product-upload-images-item">
                  <minus-icon class="minus-icon" @click="removeFile(index)" />
                  <img :src="getImageUrl(image, ImageTemplate.SmallThumbnail)" alt="upload-image" />
                </div>
              </vue-draggable-next>
            </div>

            <span v-show="fileError" class="form-error error" v-html="fileError"></span>
          </div>

          <div class="add-product-categories">
            <ui-kit-selector v-model="selectedCategory" @changed="removeChoiceSub()" :options="categoriesSelectorItems"
              :title="'CATEGORY'" :disabled="store.pendingRequestsCount" />

            <div v-show="selectedCategory" class="add-product-categories-sub">
              <ui-kit-check-box v-for="sub in currentSubCategories" v-model="sub.value" :name="'subCategory' + sub.id"
                @change="(e) => selectSubCategory(sub.id, e.target.checked)" :key="'subCategory' + sub.id"
                :title="sub.title" type="checkbox" />
            </div>

            <span v-show="subCategoryError" class="form-error error" v-html="subCategoryError"></span>
          </div>

          <ui-kit-input v-model="product.title" :errors="v$.product.title"
            :error-messages="{ required: 'Title is required' }" :server-errors="serverErrors"
            :disabled="store.pendingRequestsCount" placeholder="TITLE" />

          <ui-kit-input v-model="product.author" :errors="v$.product.author"
            :error-messages="{ required: 'Author is required' }" :server-errors="serverErrors"
            :disabled="store.pendingRequestsCount" placeholder="CREDIT ARTIST/OWNER" />

          <ui-kit-text-area v-model="product.description" :errors="v$.product.description"
            :error-messages="{ required: 'Description is required' }" :server-errors="serverErrors"
            :disabled="store.pendingRequestsCount" placeholder="DESCRIPTION" />

          <div class="space-between-inputs">
            <MeasureInput v-model.lazy="product.height" placeholder="HEIGHT CM" :errors="v$.product.height"
              :error-messages="{ required: 'Height is required' }" :server-errors="serverErrors"
              :disabled="store.pendingRequestsCount" />
            <MeasureInput v-model.lazy="product.width" placeholder="WIDTH CM" :errors="v$.product.width"
              :error-messages="{ required: 'Width is required' }" :server-errors="serverErrors"
              :disabled="store.pendingRequestsCount" />

          </div>
          <div class="space-between-inputs">
            <MeasureInput v-model.lazy="product.depth" placeholder="DEPTH CM" :errors="v$.product.depth"
              :error-messages="{ required: 'Depth is required' }" :server-errors="serverErrors"
              :disabled="store.pendingRequestsCount" />
            <MeasureInput v-model.lazy="product.weight" :type="'number'" placeholder="WEIGHT KG"
              :errors="v$.product.weight" :error-messages="{ required: 'Weight is required' }"
              :server-errors="serverErrors" :disabled="store.pendingRequestsCount" />
          </div>
          <div class="is_sale_price_tag">
            <div class="is_sale_switch" @click="is_sale_mode">
              <div class="switch-body" :class="product.is_sale_price === false ? 'to-switch-top' : 'to-switch-bottom'
                "></div>
            </div>
            <div class="price_group">
              <CurrencyInput v-model.lazy="product.price_in_euro" placeholder="PRODUCT PRICE IN EURO"
                :errors="v$.product.price_in_euro" :error-messages="{ required: 'Price in euro is required' }"
                :server-errors="serverErrors" :disabled="product.is_sale_price" />
              <CurrencyInput v-model.lazy="product.sale_price_in_euro" placeholder="PRODUCT SALE PRICE IN EURO"
                :errors="v$.product.sale_price_in_euro" :error-messages="{ required: 'Price in euro is required' }"
                :server-errors="serverErrors" :disabled="!product.is_sale_price" />
            </div>
          </div>

          <CurrencyInput v-model.lazy="product.shipping_in_euro" placeholder="SHIPPING IN EURO"
            :errors="v$.product.shipping_in_euro" :error-messages="{ required: 'Shipping in euro is required' }"
            :server-errors="serverErrors" :disabled="store.pendingRequestsCount" />
          <ui-kit-input v-model.lazy="product.quantity_for_sale" placeholder="QUANTITY FOR SALE"
            :errors="v$.product.quantity_for_sale" :error-messages="{ required: 'QUANTITY FOR SALE is required' }"
            :server-errors="serverErrors" :disabled="store.pendingRequestsCount" v-on:keyup="keyHandler($event)" />
          <ui-kit-big-check-box title="AI safe (the best we can do) &nbsp;  &nbsp;" v-model="product.is_ai_safe"
            actionTitle="Read more" @action="readAiSafe"></ui-kit-big-check-box>

          <div :style="{ paddingTop: '0.5rem' }">
            <ui-kit-input v-model="product.tags" v-if="!product.is_ai_safe" :errors="v$.product.tags"
              :error-messages="{ required: 'Tags are required' }" :disabled="product.is_ai_safe"
              placeholder="ADD TAGS, SEPARATE BY COMMA" />
            <ui-kit-text-area v-model="product.alt_text" :errors="v$.product.alt_text" :error-messages="{ required: 'Please enter alt text.' }"
              :disabled="store.pendingRequestsCount" placeholder="ADD ALT TEXT" v-if="!product.is_ai_safe" />
          </div>

          <hr class="horizontal-separator" />
          <div class="add-product-visibility-level">
            <ui-kit-big-check-box v-model="product.visibility_level" :value="COMMON_VISIBILITY_LEVEL"
              :disabled="store.pendingRequestsCount" :title="filtersStore.getById(COMMON_VISIBILITY_LEVEL).filter"
              type="radio" />

            <ui-kit-big-check-box v-model="product.visibility_level" :value="NUDITY_VISIBILITY_LEVEL"
              :disabled="store.pendingRequestsCount" :title="filtersStore.getById(NUDITY_VISIBILITY_LEVEL).filter"
              type="radio" />
            <ui-kit-big-check-box v-model="product.visibility_level" :value="EROTIC_VISIBILITY_LEVEL"
              :disabled="store.pendingRequestsCount" :title="filtersStore.getById(EROTIC_VISIBILITY_LEVEL).filter"
              type="radio" />

            <ui-kit-big-check-box v-model="product.visibility_level" :value="PORNO_VISIBILITY_LEVEL"
              :disabled="store.pendingRequestsCount" :title="filtersStore.getById(PORNO_VISIBILITY_LEVEL).filter"
              type="radio" />
            <span v-for="(message, key) in { required: 'Visibility is required. ' }"
              v-show="v$.product.visibility_level.$error" v-html="message" :key="key" class="form-error error"></span>
          </div>

          <div class="ui-kit-modal-content-buttons">
            <button :disabled="store.pendingRequestsCount" class="button full-width" type="submit">
              <span>SEND FOR APPROVAL</span>
            </button>
          </div>
        </div>
      </form>
    </template>
  </ui-kit-modal>

  <delete-product-modal ref="deleteProductModalRef" @confirm="deleteProduct()" />
  <ai-safe-description-modal ref="aiSafeDescriptionModalRef" />
</template>

<script setup lang="ts">
import {
  ROLE_ADMIN,
  STATUS_APPROVED,
  STATUS_PENDING,
  STATUS_REJECTED,
} from "~/types/constants";
import { computed, ref, reactive } from "vue";
import { useCategoriesStore } from "~/store/categories";
import { storeToRefs } from "pinia";
import { VueDraggableNext } from "vue-draggable-next";
import { useStore } from "~/store";
import { useMediaStore } from "~/store/media";
import { useProductsStore } from "~/store/products";
import {
  COMMON_VISIBILITY_LEVEL,
  EROTIC_VISIBILITY_LEVEL,
  ImageTemplate,
  NUDITY_VISIBILITY_LEVEL,
  PORNO_VISIBILITY_LEVEL,
} from "~/types/constants";
import UiKitModal from "~/components/UiKit/UiKitModal.vue";
import CurrencyInput from "~~/components/UiKit/CurrencyInput.vue";
import MeasureInput from "~~/components/UiKit/MeasureInput.vue";
import MinusIcon from "~/assets/svg/minus.svg";
import useMedia from "~/composable/media";
import useVuelidate from "@vuelidate/core";
import { required, requiredIf } from "@vuelidate/validators";
import { Media } from "~~/types";
import CloseIcon from "~/assets/svg/close.svg";
import TrashIcon from "~/assets/svg/icon_trash.svg";
import { useFiltersStore } from "~/store/filters";
import DeleteProductModal from "~/components/Modals/DeleteProductModal.vue";
import AiSafeDescriptionModal from "~/components/Modals/AiSafeDescriptionModal";
import UiKitBigCheckBox from "~/components/UiKit/UiKitBigCheckBox.vue";
import UiKitTextArea from "../UiKit/UiKitTextArea.vue";

import randomWords from "random-words";

const words = ref(randomWords({ exactly: 5 }));

const editProductModal = ref<InstanceType<typeof UiKitModal>>(null);
const file = ref<InstanceType<typeof HTMLInputElement>>(null);
const files = ref([]);
const filtersStore = useFiltersStore();
const store = useStore();
const categoriesStore = useCategoriesStore();
const mediaStore = useMediaStore();
const productStore = useProductsStore();
const { getImageUrl } = useMedia();
const { items } = storeToRefs(categoriesStore);
const selectedCategory = ref<null | number>(null);

const deleteProductModalRef = ref<InstanceType<typeof DeleteProductModal>>(null);
const aiSafeDescriptionModalRef = ref<InstanceType<typeof AiSafeDescriptionModal>>(null);

const currentSubCategories = computed(() => {
  const children = selectedCategory.value
    ? items.value.find((item) => item.id === selectedCategory.value).children
    : [];
  const subs = children.map((child) => {
    return { ...child, value: selectedSubCategories.value.includes(child.id) };
  });
  return subs;
});

const selectedSubCategories = ref<number[]>([]);
const selectCategory = computed(
  () => selectedSubCategories.value ?? selectedCategory.value
);
const fileError = ref("");
const subCategoryError = ref("");
const error = ref("");
const serverErrors = ref({});

const categoriesSelectorItems = computed(() =>
  items.value.map((category) => ({
    title: category.title,
    key: category.id,
    payload: category,
  }))
);

const product = reactive({
  price: 0,
  categories: selectCategory,
  media: [],
  author: "",
  title: "",
  description: "",
  status: STATUS_PENDING,
  tags: "",
  visibility_level: 0,
  is_ai_safe: false,
  height: 0,
  width: 0,
  depth: 0,
  price_in_euro: 0,
  shipping_in_euro: 0,
  quantity_for_sale: 1,
  sale_price_in_euro: 0,
  is_sale_price: false,
  alt_text: '',
  weight: 0
});

const v$ = useVuelidate(
  {
    product: {
      price: { required },
      author: { required },
      title: { required },
      description: { required },
      height: { required },
      width: { required },
      depth: { required },
      price_in_euro: { required },
      sale_price_in_euro: { required },
      shipping_in_euro: { required },
      quantity_for_sale: { required },
      tags: { required },
      visibility_level: { required },
      is_ai_safe: {},
      alt_text: {
        required: requiredIf(function (){
          return !product.is_ai_safe
        })
      },
      weight: { required }
    },
  },
  { product }
);

async function addFiles(event: any) {
  const media = event.target.files || event.dataTransfer.files;

  if (!media.length) {
    return;
  }

  let exceed = false;
  let hasLarge = false;
  for (const item of media) {
    const maxSize = 5 * 1024 * 1024; // Set the maximum item size here (in bytes)
    if (item.size > maxSize) {
      fileError.value = "The file size exceeds the maximum allowed size of 5MB.";
      exceed = true;
      continue;
    }
    if (!exceed) {
      fileError.value = "";
    }

    // Check the image resolution.
    const reader = new FileReader();
    reader.onload = async function () {
      const img = new Image();
      img.onload = async function () {
        if (this.naturalWidth > 3840 || this.naturalHeight > 2160) {
          fileError.value =
            "The image size exceeds the maximum allowed size of width(3840px) or height(2160px).";
          hasLarge = true;
          return;
        }

        if (!hasLarge) {
          fileError.value = "";
        }

        try {
          const response = await mediaStore.upload(item, item.name);

          files.value.push(response.data);
          product.media.push(response.data.id);
        } catch (e) {
          fileError.value = e.response.data.errors.file;
        }
      };
      img.src = reader.result;
    };
    await reader.readAsDataURL(item);
  }
}
function is_sale_mode() {
  product.is_sale_price = !product.is_sale_price;
}
function openAiSafeDescriptionModal() {
  aiSafeDescriptionModalRef.value.open();
}
function removeFile(index: number) {
  files.value.splice(index, 1);
  product.media.splice(index, 1);
}

function sortFiles() {
  product.media = [...files.value.map((media: Media) => media.id)];
}

const selectSubCategory = (cId: number, selected: any) => {
  if (selected) {
    selectedSubCategories.value.push(cId);
  } else {
    selectedSubCategories.value = selectedSubCategories.value.filter(
      (existingId) => existingId !== cId
    );
  }
};

function euroChange(key) {
  product[key] = product[key].replace(/[^0-9,]/g, "");
}

function removeChoiceSub() {
  selectedSubCategories.value = [];
}

function initializeProductFields() {
  selectedCategory.value = productStore.item.categories
    ? productStore.item.categories[0]?.parent_id
    : null;
  selectedSubCategories.value = productStore.item.categories.map((c) => c.id);
  files.value = productStore.item.media;
  product.price = productStore.item.price;
  product.width = productStore.item.width;
  product.height = productStore.item.height;
  product.depth = productStore.item.depth;
  product.price_in_euro = productStore.item.price_in_euro;
  product.shipping_in_euro = productStore.item.shipping_in_euro;
  product.quantity_for_sale = productStore.item.quantity_for_sale;
  product.media = productStore.item.media.map((m) => m.id);
  product.author = productStore.item.author;
  product.title = productStore.item.title;
  product.description = productStore.item.description;
  product.tags = productStore.item.tags;
  product.visibility_level = productStore.item.visibility_level;
  product.is_ai_safe = productStore.item.is_ai_safe;
  product.sale_price_in_euro = productStore.item.sale_price_in_euro;
  product.is_sale_price = productStore.item.is_sale_price;
  product.alt_text = productStore.item.alt_text;
  product.weight = productStore.item.weight;
}

function keyHandler(event) {
  var charCode = (event.which) ? event.which : event.keyCode
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    product.quantity_for_sale = 1; 
  }
}

async function deleteProduct() {
  deleteProductModalRef.value.close();
  await productStore.delete(productStore.item.id).then(async () => {
    close();
    await productStore.fetchAll();
  });
}

async function updateProduct() {
  if (product.media.length < 1) {
    fileError.value = "Media is required. ";
    return;
  }

  if (product.categories.length < 1) {
    subCategoryError.value = "Must select at least one sub category. ";
    return;
  }

  // this is a temporary solution to add tags if ai_safe = true, until the backend is ready, should be removed in the future
  if (product.is_ai_safe) {
    const tags = ref([...words.value, ...["copyright", "copy right"]]);
    product.tags = product.tags || tags.value?.join(", ");
  }

  v$.value.$touch();

  if (v$.value.$error) {
    return;
  }

  error.value = "";
  serverErrors.value = {};
  fileError.value = "";

  try {
    await productStore.update(productStore.item.id, product).then(async () => {
      close();
      await productStore.fetchAll();
      await productStore.getPendingCount();
    });
  } catch (e) {
    if (e.response && !e.response.data.errors) {
      error.value = "Something went wrong! Please try again later.";

      return;
    }

    serverErrors.value = e.response.data.errors;
  }
}

async function open() {
  await filtersStore.fetchAll();
  initializeProductFields();
  editProductModal.value?.open();
}

function close() {
  editProductModal.value?.close();
}

defineExpose({ open, close });
</script>
