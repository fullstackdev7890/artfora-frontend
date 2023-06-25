<template>
  <div class="page-container">
    <the-header
      v-show="$route.name !== 'products-id'"
      @open-log-in-modal="modalsComponentRef.openLogInModal()"
      @open-add-product-modal="modalsComponentRef.openAddProductModal()"
      @open-cart-modal="modalsComponentRef.openCartModal()"
      @open-contact-us-modal="modalsComponentRef.openContactUsModal()"
      @open-start-selling-modal="modalsComponentRef.openStartSellingModal()"
      @open-gallery-settings-modal="modalsComponentRef.openGallerySettingsModal()"
      @open-set-up-account-modal="modalsComponentRef.openSetUpAccountModal()"
      @open-about-artfora-modal="modalsComponentRef.openAboutArtforaModal()"
      @open-faq-modal="modalsComponentRef.openFaqModal()"
    />

    <slot/>

    <modals-component ref="modalsComponentRef" />
    <the-footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRuntimeConfig } from '#app'
import TheHeader from '~/components/Layout/TheHeader.vue'
import ModalsComponent from '~/components/Layout/ModalsComponent.vue'
import TheFooter from '~/components/Layout/TheFooter'


const config = useRuntimeConfig()

useHead({
  script: [
    { children: `var mtcaptchaConfig = { "sitekey": "${config.public.MTCAPTCHA_SITE_KEY}", "widgetSize": "mini", "render": "explicit" }` },
    {
      src: 'https://service.mtcaptcha.com/mtcv1/client/mtcaptcha.min.js',
      async: true
    },
    {
      src: 'https://service2.mtcaptcha.com/mtcv1/client/mtcaptcha2.min.js',
      async: true
    }
  ]
})


const modalsComponentRef = ref<InstanceType<typeof ModalsComponent>>(null)
</script>

<style lang="scss">
  @import '~/assets/scss/index.scss';
</style>