<template>
  <header
    class="header"
    :class="{ 'header-hide': hideHeader }"
  >
    <div class="header-top">
      <search-bar />

      <div class="container header-title">
        <h1>ARTfora</h1>
      </div>

      <div>
        <span class="switch-item" @click="openSignUpModal">SignUp</span>
      </div>

      <profile-menu />
    </div>

    <div class="header-bottom-divider"></div>

    <sign-up-modal ref="signUpModalRef" />
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'
import { ref } from '@vue/reactivity'
import SearchBar from '~/components/Layout/SearchBar.vue'
import ProfileMenu from '~/components/Layout/ProfileMenu.vue'
import SignUpModal from '~/components/modals/SignUpModal.vue'

let hideHeader = ref(false)
let scrollPosition

const signUpModalRef = ref<InstanceType<typeof SignUpModal>>(null)

const router = useRouter()

router.beforeEach((to, from, next) => {
  closeSignUpModal()

  next()
})

onMounted(() => {
  if (process.client) {
    scrollPosition = window.scrollY
    window.addEventListener('scroll', handleScroll)
    handleScroll()
  }
})

onUnmounted(() => {
  if (process.client) {
    scrollPosition = window.scrollY
    window.removeEventListener('scroll', handleScroll)
  }
})

function openSignUpModal() {
  signUpModalRef.value.open()
}

function closeSignUpModal() {
  signUpModalRef.value.close()
}

function handleScroll () {
  let currentScrollPosition = window.scrollY
  hideHeader.value = currentScrollPosition > scrollPosition && currentScrollPosition > 100
  scrollPosition = window.scrollY
}
</script>
