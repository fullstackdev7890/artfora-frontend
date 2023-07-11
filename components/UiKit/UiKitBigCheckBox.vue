<template>
  <div class="form-checkbox-big" :cy-name="name">
    <label :for="name" class="input-checkbox-big">
      <input
        :id="name"
        v-model="model"
        :name="name"
        :value="value"
        :type="type"
        ref="checkbox"
        class="check-box-big"
      />
      <div v-show="showCheckbox" class="input-checkbox-box-big"></div>
      <div v-html="title" class="checkbox-title"></div>
      <slot></slot>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  modelValue: boolean;
  name: string;
  title: string;
  value: number | string;
  type?: "checkbox" | "radio";
  showCheckbox: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "checkbox",
  showCheckbox: true,
});
const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit("update:modelValue", newValue);
  },
});
</script>
