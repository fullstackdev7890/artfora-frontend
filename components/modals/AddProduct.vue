<template>
  <ui-kit-modal
  :title="'Add Product'"
  :with-footer="false"
  ref="addProductModal"
  >
  <template v-slot:content>
    <div class="add-product">

      <div class="add-product-upload">
        <label for="uploadImage" class="add-product-upload-add" @drag="">
          DROP IMAGE(S) HERE <br>
          OR CLICK TO BROWSE <br>
          SHOULD BE AT LEAST 1920 X 586 PIXELS <br>
          <input
            id="uploadImage"
            @change="addFile()"
            accept="image/bmp, image/png, image/jpeg"
            type="file"
            ref="file"
            multiple
          >
        </label>
        <div class="add-product-upload-images">
          <div
            v-if="files.length !== 0"
            v-for="(image, index) in files"
            :key="image.size"
            class="add-product-upload-images-item"
          >
            <minus-icon class="minus-icon" @click="removeFile(index)" />
            <img :src="URL.createObjectURL(image)" alt="upload-image">
          </div>
        </div>
      </div>

      <div class="add-product-categories">
        <ui-kit-selector
          v-model="ChoiceCategory"
          :options="[...categoriesSelector]"
          :title="'CATEGORY'"
        />
        <div v-show="ChoiceCategory" class="add-product-categories-sub">
          <label
            v-for="sub in currentSubCategories"
            :for="'subCategory' + sub.id"
            class="add-product-categories-sub-checkbox input-checkbox"
          >
            <input
              :id="'subCategory' + sub.id"
              v-model="choiceSubCategories"
              :value="sub.parent_id + sub.id"
              type="checkbox"
            >
            <div class="input-checkbox-box"></div>
            {{ sub.title }}
          </label>
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

    </div>
  </template>
  </ui-kit-modal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { URL } from 'core-js'
import { useCategoriesStore } from '~/store/categories'
import UiKitModal from '~/components/UiKit/UiKitModal.vue'
import MinusIcon from '~/assets/svg/minus.svg'

const addProductModal = ref<InstanceType<typeof UiKitModal>>(null)
const file = ref<InstanceType<typeof HTMLInputElement>>(null)
const files = ref([])
const { categories, categoriesSelector } = useCategoriesStore()
const ChoiceCategory = ref(null)
const currentSubCategories = computed(() => ChoiceCategory.value ? categories.find((category) => category.id === ChoiceCategory.value).children : [])
const choiceSubCategories = ref([])
const creditOwner = ref('')
const description = ref('')

const addFile = () => {
  if (files.value.length === 0) {
    files.value = Array.from(file.value.files)
  } else {
    files.value.push(...Array.from(file.value.files))
  }
}

const removeFile = (index: number) => {
  files.value.splice(index, 1)
}

function open() {
  addProductModal.value?.open()
}

function close() {
  addProductModal.value?.close()
}

defineExpose({ open, close })
</script>
