<template>
  <div class="page-container">
    <the-header v-show="$route.name !== 'products-id'" />

    <slot/>
  </div>
</template>

<script setup lang="ts">
import TheHeader from '~/components/Layout/TheHeader.vue'
</script>

<style lang="scss">
  @import '~/assets/scss/index.scss';
</style>