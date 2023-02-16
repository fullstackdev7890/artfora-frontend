<template>
  <ui-kit-modal
  title="Add Product"
  :with-footer="false"
  ref="addProductModal"
  >
  <template v-slot:content>
    <div class="add-product">

      <div class="add-product-upload">
        <label for="uploadImage" class="add-product-upload-add">
          DROP IMAGE(S) HERE <br>
          OR CLICK TO BROWSE <br>
          SHOULD BE AT LEAST 1920 X 586 PIXELS <br>
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
          <vue-draggable-next :list="files" class="add-product-upload-images-draggable">
            <div
              v-if="files.length !== 0"
              v-for="(image, index) in files"
              :key="image.id"
              class="add-product-upload-images-item"
            >
              <minus-icon class="minus-icon" @click="removeFile(index)" />
              <img :src="getImageUrl(image)" alt="upload-image">
            </div>
          </vue-draggable-next>
        </div>
      </div>

      <div class="add-product-categories">
        <ui-kit-selector
          v-model="selectedCategory"
          @changed="removeChoiceSub()"
          :options="[...categoriesSelector]"
          :title="'CATEGORY'"
        />
        <div v-show="selectedCategory" class="add-product-categories-sub">
          <ui-kit-check-box
            v-for="sub in currentSubCategories"
            v-model="selectedSubCategories"
            :name="'subCategory' + sub.id"
            :value="sub.id"
            :title="sub.title"
          />
        </div>
      </div>

      <ui-kit-input
        v-model="creditOwner"
        placeholder="CREDIT ARTIST/OWNER"
      />

      <ui-kit-text-area
        v-model="description"
        placeholder="DESCRIPTION(OPTIONAL)"
      />

      <ui-kit-check-box
        v-model="aiSafe"
      >
        AI safe (the best we can do) <a href="#" class="link">read more</a>
      </ui-kit-check-box>

      <ui-kit-input
        v-if="!aiSafe"
        v-model="tags"
        placeholder="ADD TAGS, SEPARATE BY COMMA"
      />

      <ui-kit-check-box
        v-model="visibility"
        :value="COMMON_VISIBILITY_LEVEL"
        title="For all users, does not contain explicit material"
        type="radio"
      />

      <ui-kit-check-box
        v-model="visibility"
        :value="NUDITY_VISIBILITY_LEVEL"
        title="Can contain nudity but only for educational use"
        type="radio"
      />

      <ui-kit-check-box
        v-model="visibility"
        :value="EROTIC_VISIBILITY_LEVEL"
        title="Can contain nudity and erotic material"
        type="radio"
      />

      <ui-kit-check-box
        v-model="visibility"
        :value="PORNO_VISIBILITY_LEVEL"
        title="Can contain pornographic or other explicit material"
        type="radio"
      />

      <div class="ui-kit-modal-content-buttons">
        <button class="button full-width" @click="uploadProduct()">SEND FOR APPROVAL</button>
      </div>
    </div>
  </template>
  </ui-kit-modal>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import { useCategoriesStore } from '~/store/categories'
import { storeToRefs } from 'pinia'
import { VueDraggableNext } from 'vue-draggable-next'
import { useMediaStore } from '~/store/media'
import { COMMON_VISIBILITY_LEVEL, EROTIC_VISIBILITY_LEVEL, NUDITY_VISIBILITY_LEVEL, PORNO_VISIBILITY_LEVEL } from '~/types/constants'
import { useProductsStore } from '~/store/products'
import UiKitModal from '~/components/UiKit/UiKitModal.vue'
import MinusIcon from '~/assets/svg/minus.svg'
import useMedia from '~/composable/media'

const addProductModal = ref<InstanceType<typeof UiKitModal>>(null)
const file = ref<InstanceType<typeof HTMLInputElement>>(null)
const files = ref([])
const CategoriesStore = useCategoriesStore()
const mediaStore = useMediaStore()
const productStore = useProductsStore()
const { getImageUrl } = useMedia()
const { categories, categoriesSelector } = storeToRefs(CategoriesStore)
const selectedCategory = ref(null)
const currentSubCategories = computed(() => selectedCategory.value ? categories.value[selectedCategory.value - 1].children : [])
const selectedSubCategories = ref([])
const creditOwner = ref('')
const description = ref('')
const aiSafe = ref(false)
const tags = ref('')
const visibility = ref(null)

const addFiles = async (event: any) => {
  const media = event.target.files || event.dataTransfer.files

  if (!media.length) {
    return
  }

  for (const item of media) {
    const response = await mediaStore.upload(item, item.name)
    files.value.push(response.data)
  }
}

const removeChoiceSub = () => {
  selectedSubCategories.value = []
}

const removeFile = (index: number) => {
  files.value.splice(index, 1)
}

const uploadProduct = async () => {

  let product = {
    price: null,
    category_id: selectedSubCategories.value,
    author: creditOwner.value,
    title: '',
    description: description.value,
    tags: tags.value,
    visibility_level: visibility.value,
  }

  if (files.value.length > 0) {
    product.media = [...files.value].map((item) => item.id)
  }

  if (aiSafe.value) {
    product.is_ai_safe = aiSafe.value
    product.tags = ''
  }

  productStore.create(product).then(close)
}

function open() {
  addProductModal.value?.open()
}

function close() {
  addProductModal.value?.close()
}

defineExpose({ open, close })
</script>
