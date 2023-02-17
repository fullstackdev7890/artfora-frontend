<template>
    <div class="form-checkbox" :cy-name="name">
      <label
        :for="name"
        class="input-checkbox"
      >
        <input
          :id="name"
          :name="name"
          :value="value"
          :type="type"
          ref="checkbox"
          v-model="model"
        >
        <div class="input-checkbox-box"></div>
        {{ title }}
        <slot></slot>
      </label>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: boolean,
  name: string,
  title: string,
  value: number,
  type?: 'checkbox' | 'radio'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'checkbox'
})
const emit = defineEmits(['update:modelValue'])

const model = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  }
})
</script>
