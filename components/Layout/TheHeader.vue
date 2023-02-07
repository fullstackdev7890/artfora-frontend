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

      <profile-menu />
    </div>

    <categories />

    <div class="header-bottom-divider"></div>
  </header>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import SearchBar from '~/components/Layout/SearchBar.vue'
import ProfileMenu from '~/components/Layout/ProfileMenu.vue'
import Categories from '~/components/Layout/Categories.vue'

const hideHeader = ref(false)
const scrollPosition = ref(0)

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
  hideHeader.value = currentScrollPosition > scrollPosition.value && currentScrollPosition > 100
  scrollPosition.value = window.scrollY
}

</script>
