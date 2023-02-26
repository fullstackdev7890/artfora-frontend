<template>
  <div class="page-container">
    <the-header
      v-show="$route.name !== 'products-id'"
      @open-sign-up-modal="modalsComponentRef.openSignUpModal()"
      @open-add-product-modal="modalsComponentRef.openAddProductModal()"
      @open-contact-us-modal="modalsComponentRef.openContactUsModal()"
      @open-gallery-settings-modal="modalsComponentRef.openGallerySettingsModal()"
      @open-set-up-account-modal="modalsComponentRef.openSetUpAccountModal()"
    />

    <slot/>

    <modals-component ref="modalsComponentRef" />
  </div>
</template>

<script setup lang="ts">
import TheHeader from '~/components/Layout/TheHeader.vue'
import ModalsComponent from '~/components/Layout/ModalsComponent.vue'
import { ref } from 'vue'

const modalsComponentRef = ref<InstanceType<typeof ModalsComponent>>(null)
</script>

<style lang="scss">
  @import '~/assets/scss/index.scss';
</style>