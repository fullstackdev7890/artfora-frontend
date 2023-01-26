<template>
  <div>
<!--    <the-header/>-->

    <slot/>

<!--    <the-footer/>-->
  </div>
</template>

<script setup lang="ts">
import TheHeader from '~/components/Layout/TheHeader.vue'
import TheFooter from '~/components/Layout/TheFooter.vue'
</script>

<style lang="scss">
  @import '~/assets/scss/index.scss';
</style>