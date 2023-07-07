<template>
  <div v-if="isShown" class="ui-kit-modal-container">
    <div class="ui-kit-modal-container-background" @click="closeByClickOutsideAction()">
      <div class="multi-content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

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
const isShown = ref(false);
const isOver = ref(false);

function open() {
  // @ts-ignore
  document.querySelector("body").style.overflow = "hidden";
  isShown.value = true;
}

function close() {
  // @ts-ignore
  document.querySelector("body").style.overflow = "auto";
  isShown.value = false;
}

function closeByClickOutsideAction() {
  if (props.closeByClickOutside) {
    close();
  }
}
defineExpose({ open, close });
</script>
