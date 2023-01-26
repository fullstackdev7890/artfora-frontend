<template>
  <main class="home-page">
    <main-container>
      <h1 style="text-align: center;">ARTfora</h1>
      <h2 style="text-align: center;">Page under construction!</h2>
    </main-container>
  </main>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { useHead } from '@vueuse/head'
import MainContainer from '~/components/Layout/MainContainer.vue'

const title = ref('')

const description = ref('')

useHead({
  title: title,
  meta: [
    { name: 'description', content: description },
    { name: 'content-type', content: 'text/html; charset=UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' }
  ]
})

</script>