<template>
  <ui-kit-modal
  :title="'Add Product'"
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
            @change="addFile()"
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
              :key="image.size"
              class="add-product-upload-images-item"
            >
              <minus-icon class="minus-icon" @click="removeFile(index)" />
              <img :src="URL.createObjectURL(image)" alt="upload-image">
            </div>
          </vue-draggable-next>
        </div>
      </div>

      <div class="add-product-categories">
        <ui-kit-selector
          v-model="ChoiceCategory"
          @changed="removeChoiceSub()"
          :options="[...categoriesSelector]"
          :title="'CATEGORY'"
        />
        <div v-show="ChoiceCategory" class="add-product-categories-sub">
          <ui-kit-check-box
            v-for="sub in currentSubCategories"
            v-model="choiceSubCategories"
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
        v-model="ForAllUsers"
        title="For all users, does not contain explicit material"
      />

      <ui-kit-check-box
        v-model="nudityForEducation"
        title="Can contain nudity but only for educational use"
      />

      <ui-kit-check-box
        v-model="EroticMaterial"
        title="Can contain nudity and erotic material"
      />

      <ui-kit-check-box
        v-model="ExplicitMaterial"
      title="Can contain pornographic or other explicit material"
      />

      <div class="ui-kit-modal-content-buttons">
        <button class="button full-width">SEND FOR APPROVAL</button>
      </div>
    </div>
  </template>
  </ui-kit-modal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { URL } from 'core-js'
import { useCategoriesStore } from '~/store/categories'
import { storeToRefs } from 'pinia'
import { VueDraggableNext } from 'vue-draggable-next'
import UiKitModal from '~/components/UiKit/UiKitModal.vue'
import MinusIcon from '~/assets/svg/minus.svg'

const addProductModal = ref<InstanceType<typeof UiKitModal>>(null)
const file = ref<InstanceType<typeof HTMLInputElement>>(null)
const files = ref([])
const store = useCategoriesStore()
const { categories, categoriesSelector } = storeToRefs(store)
const ChoiceCategory = ref(null)
const currentSubCategories = computed(() => ChoiceCategory.value ? categories.value[ChoiceCategory.value - 1].children : [])
const choiceSubCategories = ref([])
const creditOwner = ref('')
const description = ref('')
const aiSafe = ref(false)
const tags = ref('')
const ForAllUsers = ref(false)
const nudityForEducation = ref(false)
const EroticMaterial = ref(false)
const ExplicitMaterial = ref(false)

const addFile = () => {
  if (files.value.length === 0) {
    files.value = Array.from(file.value.files)
  } else {
    files.value.push(...Array.from(file.value.files))
  }
}

const removeChoiceSub = () => {
  choiceSubCategories.value = []
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
