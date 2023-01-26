<template>
  <header
    class="header"
    :class="{ 'header-hide': hideHeader }"
  >
    <search-bar />

    <div class="container header-title">
      <h1>ARTfora</h1>
    </div>

    <profile-menu />
  </header>
</template>

<script setup lang="ts">
import SearchBar from '~/components/Layout/SearchBar.vue'
import ProfileMenu from '~/components/Layout/ProfileMenu.vue'
import { onMounted, onUnmounted } from 'vue'
import { ref } from '@vue/reactivity'

let hideHeader = ref(false)
let scrollPosition

onMounted(() => {
  if (process.client) {
    scrollPosition = window.scrollY
    window.addEventListener('scroll', handleScroll);
    handleScroll()
  }
})

onUnmounted(() => {
  if (process.client) {
    scrollPosition = window.scrollY
    window.removeEventListener('scroll', handleScroll);
  }
})

function handleScroll () {
  let currentScrollPosition = window.scrollY
  hideHeader.value = currentScrollPosition > scrollPosition && currentScrollPosition > 100
  scrollPosition = window.scrollY
}
</script>
