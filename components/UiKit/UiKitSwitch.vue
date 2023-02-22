<template>
  <div class="gallery-settings-switch">

    <label
      v-for="option in options"
      :class="{ 'gallery-settings-switch-label-active': option.key }"
      :for="option.title"
      class="gallery-settings-switch-label"
    >
      <input
        @change="$emit('change', option.key)"
        :value="option.key"
        class="hidden"
        type="radio"
        id="switch-latest"
      />
      {{ option.title }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { OptionItem } from '~/types/uiKit'

interface props {
  options: OptionItem[]
}
const props = defineProps<props>()

</script>