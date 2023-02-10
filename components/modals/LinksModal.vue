<template>
  <ui-kit-modal :title="'Links'" :with-footer="false" ref="linksModal" class="links-modal">
    <template v-slot:content>
      <div class="ui-kit-modal-content">
        <div class="links-modal-item">
          <browser-icon class="social-icon"/>
          <a href="" class="ui-kit-modal-content-links">website.com</a>
        </div>
        <div class="links-modal-item">
          <instagram-icon class="social-icon" />
          <a href="" class="ui-kit-modal-content-links">instagram.com</a>
        </div>
        <div class="links-modal-item">
          <facebook-icon class="social-icon" />
          <a href="" class="ui-kit-modal-content-links">facebook.com</a>
        </div>
        <div class="links-modal-item">
          <bandcamp-icon class="social-icon" />
          <a href="" class="ui-kit-modal-content-links">bandcamp.com</a>
        </div>
        <div class="links-modal-item">
          <youtube-icon class="social-icon" />
          <a href="" class="ui-kit-modal-content-links">youtube.com</a>
        </div>
        <div class="links-modal-item">
          <twitch-icon class="social-icon" />
          <a href="" class="ui-kit-modal-content-links">twitch.com</a>
        </div>
        <div class="links-modal-item">
          <patreon-icon class="social-icon" />
          <a href="" class="ui-kit-modal-content-links">patreon.com</a>
        </div>
      </div>

      <div class="ui-kit-modal-content-buttons">
        <button class="button full-width" @click="linksModal.close()">CLOSE</button>
      </div>
    </template>
  </ui-kit-modal>
</template>

<script setup lang="ts">
import UiKitModal from '~/components/UiKit/UiKitModal.vue'
import { ref } from "@vue/reactivity";
import BrowserIcon from '~/assets/svg/social/browser.svg'
import InstagramIcon from '~/assets/svg/social/instagram.svg'
import FacebookIcon from '~/assets/svg/social/facebook.svg'
import BandcampIcon from '~/assets/svg/social/bandcamp.svg'
import YoutubeIcon from '~/assets/svg/social/youtube.svg'
import TwitchIcon from '~/assets/svg/social/twitch.svg'
import PatreonIcon from '~/assets/svg/social/patreon.svg'

const linksModal = ref<InstanceType<typeof UiKitModal>>(null)

function open() {
  linksModal.value?.open()
}

function close() {
  linksModal.value?.close()
}

defineExpose({ open, close })
</script>