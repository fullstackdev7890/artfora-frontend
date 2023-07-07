<template>
  <div class="ui-kit-sub-modal">
    <ui-kit-sub-box
      :with-footer="withFooter"
      :with-header="withHeader"
      :close-btn-as-home-link="closeBtnAsHomeLink"
      class="ui-kit-sub-modal-content"
    >
      <template v-slot:customHeader>
        <slot name="customHeader"></slot>
      </template>

      <template v-slot:content>
        <slot name="content"></slot>
      </template>

      <template v-slot:footer>
        <slot name="buttons"></slot>
      </template>
    </ui-kit-sub-box>
  </div>
</template>

<script setup lang="ts">
import UiKitSubBox from "~/components/UiKit/UiKitSubBox.vue";
interface Props {
  title?: string;
  closeByClickOutside?: boolean;
  withFooter?: boolean;
  withHeader?: boolean;

  closeBtnAsHomeLink?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  closeByClickOutside: false,
  withFooter: true,
  withHeader: true,
  closeBtnAsHomeLink: false,
});
</script>
