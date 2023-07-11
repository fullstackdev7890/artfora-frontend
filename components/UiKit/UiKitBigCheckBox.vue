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
    </label>
    <div
      class="checkbox-title"
      :style="{
        display: props.actionTitle ? null : 'flex',
        alignItems: props.actionTitle ? 'center' : 'center',
      }"
    >
      <span>
        {{ props.title }}
      </span>
      <span v-if="actionTitle" class="link seller-read-more-link" @click.stop="onClick">{{
        props.actionTitle
      }}</span>
    </div>
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
  actionTitle: string;
  action: () => void;
  showCheckbox: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  type: "checkbox",
  showCheckbox: true,
  actionTitle: "",
  title: "",
});
const emit = defineEmits(["update:modelValue", "action"]);
function onClick() {
  emit("action");
}
const model = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit("update:modelValue", newValue);
  },
});
</script>
