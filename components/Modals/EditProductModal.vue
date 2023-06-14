<template>
  <ui-kit-modal
  title="Edit Product"
  :with-header="false"
  :with-footer="false"
  ref="editProductModal"
  >
  <template v-slot:customHeader>
    <header class="edit-product-header">
      <trash-icon
          @click="deleteProductModalRef.open()" 
          class="trash-icon ui-kit-box-tools-link trash-icon"
        />
      <h5>Edit Product</h5>
      <div class="edit-product-header-tools">
        <close-icon
          @click="close()"
          class="close-icon ui-kit-box-tools-link"
        />
      </div>

    </header>
  </template>

  <template v-slot:content>
    <form @submit.prevent="updateProduct()">
      <div class="add-product">
        <div class="add-product-upload">
          <label for="uploadImage" class="add-product-upload-add">
            DROP IMAGE(S) HERE <br>
            OR CLICK TO BROWSE <br>
            MINIMUM WIDTH 1920 PX <br>
            AND MAX 5MB <br>
            <input
              id="uploadImage"
              @change="addFiles($event)"
              accept="image/bmp, image/png, image/jpeg"
              type="file"
              ref="file"
              multiple
            >
          </label>

          <div class="add-product-upload-images">
            <vue-draggable-next :list="files" @change="sortFiles()" class="add-product-upload-images-draggable">
              <div
                v-if="files.length !== 0"
                v-for="(image, index) in files"
                :key="image.id"
                class="add-product-upload-images-item"
              >
                <minus-icon class="minus-icon" @click="removeFile(index)" />
                <img :src="getImageUrl(image, ImageTemplate.SmallThumbnail)" alt="upload-image">
              </div>
            </vue-draggable-next>
          </div>

          <span
            v-show="fileError"
            class="form-error error"
            v-html="fileError"
          ></span>
        </div>

        <div class="add-product-categories">
          <ui-kit-selector
            v-model="selectedCategory"
            @changed="removeChoiceSub()"
            :options="categoriesSelectorItems"
            :title="'CATEGORY'"
            :disabled="store.pendingRequestsCount"
          />

          <div v-show="selectedCategory" class="add-product-categories-sub">
            <ui-kit-check-box
              v-for="sub in currentSubCategories"
              v-model="sub.value"
              :name="'subCategory' + sub.id"
              @change="(e) => selectSubCategory(sub.id, e.target.checked)"
              :key="'subCategory' + sub.id"
              :title="sub.title"
              type="checkbox"
            />
          </div>

            <span
              v-show="subCategoryError"
              class="form-error error"
              v-html="subCategoryError"
            ></span>
        </div>

        <ui-kit-input
          v-model="product.title"
          :errors="v$.product.title"
          :error-messages="{ required: 'Title is required'}"
          :server-errors="serverErrors"
          :disabled="store.pendingRequestsCount"
          placeholder="TITLE"
        />

        <ui-kit-input
          v-model="product.author"
          :errors="v$.product.author"
          :error-messages="{ required: 'Author is required'}"
          :server-errors="serverErrors"
          :disabled="store.pendingRequestsCount"
          placeholder="CREDIT ARTIST/OWNER"
        />

        <ui-kit-text-area
          v-model="product.description"
          :errors="v$.product.description"
          :error-messages="{ required: 'Description is required'}"
          :server-errors="serverErrors"
          :disabled="store.pendingRequestsCount"
          placeholder="DESCRIPTION"
        />

        <ui-kit-check-box v-model="product.is_ai_safe" class="add-product-ai-safe-checkboxes">
          AI safe (the best we can do)
          <span
            @click="emit('openAiSafeDescription')"
            class="link"
          >read more</span>
        </ui-kit-check-box>

        <ui-kit-input
          v-model="product.tags" v-if="!product.is_ai_safe"
          :errors="v$.product.tags"
          :error-messages="{ required: 'Tags are required' }"
          :disabled="product.is_ai_safe"
          placeholder="ADD TAGS, SEPARATE BY COMMA"
        />

        <div class="add-product-visibility-level">
          <ui-kit-check-box
            v-model="product.visibility_level"
            :value="COMMON_VISIBILITY_LEVEL"
            :disabled="store.pendingRequestsCount"
            :title="filtersStore.getById(COMMON_VISIBILITY_LEVEL).filter"
            type="radio"
          />

          <ui-kit-check-box
            v-model="product.visibility_level"
            :value="NUDITY_VISIBILITY_LEVEL"
            :disabled="store.pendingRequestsCount"
            :title="filtersStore.getById(NUDITY_VISIBILITY_LEVEL).filter"
            type="radio"
          />

          <ui-kit-check-box
            v-model="product.visibility_level"
            :value="EROTIC_VISIBILITY_LEVEL"
            :disabled="store.pendingRequestsCount"
            :title="filtersStore.getById(EROTIC_VISIBILITY_LEVEL).filter"
            type="radio"
          />

          <ui-kit-check-box
            v-model="product.visibility_level"
            :value="PORNO_VISIBILITY_LEVEL"
            :disabled="store.pendingRequestsCount"
            :title="filtersStore.getById(PORNO_VISIBILITY_LEVEL).filter"
            type="radio"
          />
          <span
            v-for="(message, key) in { required: 'Visibility is required. '}"
            v-show="v$.product.visibility_level.$error"
            v-html="message"
            :key="key"
            class="form-error error"
          ></span>
        </div>

        <div class="ui-kit-modal-content-buttons">
          <button
            :disabled="store.pendingRequestsCount"
            class="button full-width"
            type="submit"
          >
            <span>SEND FOR APPROVAL</span>
          </button>
        </div>
      </div>
    </form>
  </template>
  </ui-kit-modal>
      
  <delete-product-modal
      ref="deleteProductModalRef"
      @confirm="deleteProduct()"
    />
</template>

<script setup lang="ts">
import { ROLE_ADMIN, STATUS_APPROVED, STATUS_PENDING, STATUS_REJECTED } from '~/types/constants'
import { computed, ref, reactive } from 'vue'
import { useCategoriesStore } from '~/store/categories'
import { storeToRefs } from 'pinia'
import { VueDraggableNext } from 'vue-draggable-next'
import { useStore } from '~/store'
import { useMediaStore } from '~/store/media'
import { useProductsStore } from '~/store/products'
import {
  COMMON_VISIBILITY_LEVEL,
  EROTIC_VISIBILITY_LEVEL,
  ImageTemplate,
  NUDITY_VISIBILITY_LEVEL,
  PORNO_VISIBILITY_LEVEL
} from '~/types/constants'
import UiKitModal from '~/components/UiKit/UiKitModal.vue'
import MinusIcon from '~/assets/svg/minus.svg'
import useMedia from '~/composable/media'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { Media } from '~~/types'
import CloseIcon from '~/assets/svg/close.svg'
import TrashIcon from '~/assets/svg/icon_trash.svg'
import { useFiltersStore } from '~/store/filters'
import DeleteProductModal from '~/components/Modals/DeleteProductModal.vue'


const editProductModal = ref<InstanceType<typeof UiKitModal>>(null)
const file = ref<InstanceType<typeof HTMLInputElement>>(null)
const files = ref([])
const filtersStore = useFiltersStore()
const store = useStore()
const categoriesStore = useCategoriesStore()
const mediaStore = useMediaStore()
const productStore = useProductsStore()
const { getImageUrl } = useMedia()
const { items } = storeToRefs(categoriesStore)
const selectedCategory = ref<null | number>(null)

const emit = defineEmits(['openAiSafeDescription'])
const deleteProductModalRef = ref<InstanceType<typeof DeleteProductModal>>(null)


const currentSubCategories = computed(() => {
  const children = selectedCategory.value ? items.value.find((item) => item.id === selectedCategory.value).children : []
  const subs = children.map((child) => {
    return {...child, value: selectedSubCategories.value.includes(child.id)}
  })
  return subs
})

const selectedSubCategories = ref<number[]>([])
const selectCategory = computed(() => selectedSubCategories.value ?? selectedCategory.value)
const fileError = ref('')
const subCategoryError = ref('')
const error = ref('')
const serverErrors = ref({})

const categoriesSelectorItems = computed(() => items.value.map((category) => ({
  title: category.title,
  key: category.id,
  payload: category
})))

const product = reactive({
  price: 0,
  categories: selectCategory,
  media: [],
  author: '',
  title: '',
  description: '',
  status: STATUS_PENDING,
  tags: '',
  visibility_level: 0,
  is_ai_safe: false
})

const v$ = useVuelidate({
  product: {
    price: { required },
    author: { required },
    title: { required },
    description: { required },
    tags: { required },
    visibility_level: { required },
    is_ai_safe: {}
  }
}, { product })

async function addFiles(event: any) {
  const media = event.target.files || event.dataTransfer.files

  if (!media.length) {
    return
  }

  for (const item of media) {

    try {
      const response = await mediaStore.upload(item, item.name)

      files.value.push(response.data)
      product.media.push(response.data.id)
    } catch (e) {
      fileError.value = e.response.data.errors.file
    }
  }
}

function removeFile(index: number) {
  files.value.splice(index, 1)
  product.media.splice(index, 1)
}

function sortFiles() {
  product.media = [...files.value.map((media: Media) => media.id)]
}

const selectSubCategory = (cId: number, selected: any) => {
  if (selected) {
    selectedSubCategories.value.push(cId)
  } else {
    selectedSubCategories.value = selectedSubCategories.value.filter(existingId => existingId !== cId)
  }
}

function removeChoiceSub() {
  selectedSubCategories.value = []
}

function initializeProductFields() {
  selectedCategory.value = productStore.item.categories ? productStore.item.categories[0]?.parent_id : null
  selectedSubCategories.value = productStore.item.categories.map((c) => c.id)
  files.value = productStore.item.media
  product.price = productStore.item.price
  product.media = productStore.item.media.map((m) => m.id)
  product.author = productStore.item.author
  product.title = productStore.item.title
  product.description = productStore.item.description
  product.tags = productStore.item.tags
  product.visibility_level = productStore.item.visibility_level
  product.is_ai_safe = productStore.item.is_ai_safe
}

async function deleteProduct() {
  deleteProductModalRef.value.close()
  await productStore.delete(productStore.item.id).then(async () => {
    close()
    await productStore.fetchAll()
  })
}

async function updateProduct() {

  if (product.media.length < 1) {
    fileError.value = 'Media is required. '
    return
  }

  if (product.categories.length < 1) {
    subCategoryError.value = 'Must select at least one sub category. '
    return
  }

  // this is a temporary solution to add tags if ai_safe = true, until the backend is ready, should be removed in the future
  if (product.is_ai_safe) {
    product.tags = 'aiSafe'
  }

  v$.value.$touch()

  if (v$.value.$error) {
    return
  }

  error.value = ''
  serverErrors.value = {}
  fileError.value = ''

  try {
    await productStore.update(productStore.item.id, product).then(async () => {
      close()
      await productStore.fetchAll()

      await productStore.getPendingCount()
    })

  } catch (e) {
    if (e.response && !e.response.data.errors) {
      error.value = 'Something went wrong! Please try again later.'

      return
    }

    serverErrors.value = e.response.data.errors
  }
}

async function open() {
  await filtersStore.fetchAll()
  initializeProductFields()
  editProductModal.value?.open()
}

function close() {
  editProductModal.value?.close()
}

defineExpose({ open, close })
</script>
