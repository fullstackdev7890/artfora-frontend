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
  </header>
</template>

<script setup lang="ts">
import SearchBar from '~/components/Layout/SearchBar.vue'
import ProfileMenu from '~/components/Layout/ProfileMenu.vue'
</script>
