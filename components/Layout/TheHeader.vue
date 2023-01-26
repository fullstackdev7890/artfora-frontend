<template>
  <header
    class="header"
    :class="{ 'header-hide': hideHeader }"
  >
    <div class="container">
      searchbar
    </div>

    <div class="container">
      <h1>A R T f o r a</h1>
    </div>

    <div class="nav-wrap">
      <div class="container">
        dropdown menu
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { ref } from '@vue/reactivity'

// let hideHeader = false
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
