<template>
  <div class="categories">

    <div class="categories-body">
      <a
        v-if="getUserRole === ROLE_USER"
        @click.prevent="selectUserImagesCategory()"
        :class="{'categories-body-item-active': roleCategory === ROLE_USER}"
        href="#"
        class="categories-body-item categories-body-item-parents"
      >
        My images
      </a>
      <a
        v-if="getUserRole === ROLE_ADMIN"
        @click.prevent="selectAdminCategory()"
        :class="{'categories-body-item-active': roleCategory === ROLE_ADMIN}"
        href="#"
        class="categories-body-item categories-body-item-parents"
      >
        Pending ({{ pendingCount }})
      </a>
      <a
        v-for="(category) in categories"
        :class="{'categories-body-item-active': activeCategory === category.id}"
        @click.prevent="selectCategory(category.id)"
        href="#"
        class="categories-body-item categories-body-item-parents"
      >
        {{ category.title }}
      </a>
    </div>

    <div class="categories-body" v-if="subCategories">
      <label
        v-for="item in subCategories"
        :class="{'categories-body-item-active': selectSubCategories.some((el) => el === item.id)}"
        :for="item.title"
        class="categories-body-item categories-body-item-children"
      >
        {{ item.title }}
        <input
          :id="item.title"
          v-model="selectSubCategories"
          @change="selectSubCategory(item.id)"
          :value="item.id"
          type="checkbox"
        >
      </label>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useCategoriesStore } from '~/store/categories'
import { storeToRefs } from 'pinia'
import { useAsyncData } from '#app'
import { useUserStore } from '~/store/user'
import { useProductsStore } from '~/store/products'
import { STATUS_APPROVED, STATUS_PENDING, ROLE_ADMIN, ROLE_USER } from '~/types/constants'

const categoriesStore = useCategoriesStore()
const userStore = useUserStore()
const productStore = useProductsStore()
const { categories } = storeToRefs(categoriesStore)
const { getUserRole, getUserId } = storeToRefs(userStore)
const activeCategory = ref(1)
const subCategories = computed(() => categories.value.find(el => el.id === activeCategory.value)?.children ?? null)
const selectSubCategories = ref([])
const pendingCount = ref(0)
const roleCategory = ref(null)
function selectUserImagesCategory() {
  productStore.fetchAll({ user_id: getUserId.value })
  activeCategory.value = null
  roleCategory.value = ROLE_USER
}
function selectAdminCategory() {
  productStore.fetchAll({ status: STATUS_PENDING })
  activeCategory.value = null
  roleCategory.value = ROLE_ADMIN
}
function selectCategory(index: number) {
  roleCategory.value = null
  activeCategory.value = index
  selectSubCategories.value = []

  if (index === 1) {
    productStore.fetchAll({ status: STATUS_APPROVED })
    return
  }

  if (index > 1) {
    const category_id = selectSubCategories.value.length > 0 ? selectSubCategories.value.join(',') : activeCategory.value
    productStore.fetchAll({ category_id, status: STATUS_APPROVED })
  }

}
onMounted(async () => {
  await productStore.fetchAll({ status: STATUS_APPROVED })

  pendingCount.value = await productStore.pendingCount()
})

function selectSubCategory() {
  productStore.filterSubCategories(selectSubCategories.value, activeCategory.value)
}

await useAsyncData('categories', async () => {
  await categoriesStore.fetch()
})

</script>