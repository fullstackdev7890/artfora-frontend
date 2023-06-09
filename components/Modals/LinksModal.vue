<template>
  <ui-kit-modal
    :with-footer="false"
    title="Links"
    ref="linksModal"
    class="links-modal"
  >
    <template v-slot:content>
      <div v-for="(link, index) in [...links?.split(','), ...morelinks]" :key="index"
        class="ui-kit-modal-content"
      >
        <div class="links-modal-item">
          <instagram-icon class="social-icon" v-if="getSocialType(link) === 'instagram'" />
          <facebook-icon class="social-icon" v-if="getSocialType(link) === 'facebook'" />
          <bandcamp-icon class="social-icon" v-if="getSocialType(link) === 'bandcamp'" />
          <youtube-icon class="social-icon" v-if="getSocialType(link) === 'youtube'" />
          <patreon-icon class="social-icon" v-if="getSocialType(link) === 'patreon'" />
          <browser-white-icon class="social-icon" v-if="getSocialType(link) === 'other'" />
          <a :href="link" class="ui-kit-modal-content-links" target="_blank">
            {{ getLink(link) }}
          </a>
        </div>
      </div>

      <div class="links-modal-message" v-if="[...links?.split(','), ...morelinks].length === 0">
        Unfortunately the author did not provide any links.
      </div>

      <div class="ui-kit-modal-content-buttons">
        <button class="button full-width" @click="linksModal.close()">
          <span>CLOSE</span>
        </button>
      </div>
    </template>
  </ui-kit-modal>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import UiKitModal from '~/components/UiKit/UiKitModal.vue'
import BrowserIcon from '~/assets/svg/social/browser.svg'
import BrowserWhiteIcon from '~/assets/svg/social/browser-white.svg'
import InstagramIcon from '~/assets/svg/social/instagram.svg'
import FacebookIcon from '~/assets/svg/social/facebook.svg'
import BandcampIcon from '~/assets/svg/social/bandcamp.svg'
import YoutubeIcon from '~/assets/svg/social/youtube.svg'
import TwitchIcon from '~/assets/svg/social/twitch.svg'
import PatreonIcon from '~/assets/svg/social/patreon.svg'

interface Props {
  links: string | null
  morelinks: [] | []
}

const props = defineProps<Props>()
const linksModal = ref<InstanceType<typeof UiKitModal>>(null)
const sites = ref(['twitch', 'youtube', 'patreon', 'facebook', 'instagram', 'bandcamp'])

function getLink(link: string) {
  if(link){
    link = link.replace(/(^\w+:|^)\/\//, '');
    let arr = link.split('.');
    let updatedLink = '';
    for(let i = 0; i < arr.length; i++){
      if(i > 0){
        updatedLink += arr[i];
        if(i != (arr.length - 1)) updatedLink += '.';
      }
    }
    
    return updatedLink;
  }
  return '';
}

function getSocialType(link: string) {
  let socialType = 'other'
  sites.value.forEach(site => {
    const pattern = new RegExp(`(https://)?(www\.)?${site}`, 'i')
    if (pattern.test(link)) {
      socialType = site
      return
    }
  })

  return socialType
}

function open() {
  linksModal.value?.open()
}

function close() {
  linksModal.value?.close()
}

defineExpose({ open, close })
</script>