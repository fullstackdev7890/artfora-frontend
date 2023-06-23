<template>
  <header
    :class="{ 'header-hide': isShown }"
    class="header"
  >
    <div class="header-top">
      <search-bar />

      <div class="container header-title">
        <NuxtLink :to="'/'">
          <h1>ARTfora</h1>
        </NuxtLink>
      </div>

      <profile-menu
        @open-log-in-modal="emit('openLogInModal')"
        @open-add-product-modal="emit('openAddProductModal')"
        @open-start-selling-modal="emit('openStartSellingModal')"
        @open-contact-us-modal="emit('openContactUsModal')"
        @open-gallery-settings-modal="emit('openGallerySettingsModal')"
        @open-set-up-account-modal="emit('openSetUpAccountModal')"
        @open-about-artfora-modal="emit('openAboutArtforaModal')"
        @open-faq-modal="emit('openFaqModal')"
      />
    </div>

    <categories />

    <div class="header-bottom-divider"></div>
  </header>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { HEADER_HEIGHT } from '~/types'
import SearchBar from '~/components/Layout/SearchBar.vue'
import ProfileMenu from '~/components/Layout/ProfileMenu.vue'
import Categories from '~/components/Layout/Categories.vue'

const emit = defineEmits(['openAddProductModal', 'openLogInModal', 'openSignUpModal', 'openContactUsModal', 'openStartSellingModal', 'openGallerySettingsModal', 'openSetUpAccountModal',"openAboutArtforaModal",'openFaqModal'])

const isShown = ref(false)
const scrollPosition = ref(0)
const router = useRouter()

onMounted(() => {
  if (process.client) {
    scrollPosition.value = window.scrollY
    window.addEventListener('scroll', handleScroll);
    handleScroll()
  }
})

onUnmounted(() => {
  if (process.client) {
    scrollPosition.value = window.scrollY
    window.removeEventListener('scroll', handleScroll);
  }
})

function handleScroll () {
  let currentScrollPosition = window.scrollY
  isShown.value = currentScrollPosition > scrollPosition.value && currentScrollPosition > HEADER_HEIGHT
  scrollPosition.value = window.scrollY
}

router.afterEach((to) => {
  if (to.query['open-set-up-modal']) {
    emit('openSetUpAccountModal')
    window.history.replaceState( {current: '/'}, '', '/')
  }
})

</script>
