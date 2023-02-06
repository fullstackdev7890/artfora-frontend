<template>
  <header class="header">
    <div class="header-top">
      <search-bar />

      <div class="container header-title">
        <h1>ARTfora</h1>
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

const signUpModalRef = ref<InstanceType<typeof SignUpModal>>(null)

const router = useRouter()

router.beforeEach((to, from, next) => {
  closeSignUpModal()

  next()
})

function openSignUpModal() {
  signUpModalRef.value.open()
}

function closeSignUpModal() {
  signUpModalRef.value.close()
}
</script>
