<template>
  <div>
    <div
      @click="isExpanded = !isExpanded"
      :class="{ 'ui-kit-search-filter-active': isExpanded }"
      class="ui-kit-search-filter"
    >

      <label v-if="selectedValue" class="ui-kit-search-filter-value">
        {{ selectedValue }}
      </label>

      <next-icon
        :class="{'ui-kit-search-filter-arrow-open': isExpanded}"
        class="ui-kit-search-filter-arrow"
      />

      <ul
        v-if="isExpanded"
        class="ui-kit-search-filter-dropdown"
      >
        <li
          v-for="option in options"
          @click="onClick(option)"
          :key="option.key"
          :class="{ 'ui-kit-search-filter-dropdown-item-active': option.key === selectedOption.key }"
          class="ui-kit-search-filter-dropdown-item"
        >
          {{ option.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from '@vue/reactivity'
import { defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import NextIcon from '~/assets/svg/next.svg'
import ArrowUpIcon from '~/assets/svg/arrow-up.svg'
import ArrowDownIcon from '~/assets/svg/arrow-down.svg'
import {OptionItem} from "~/types/uiKit";

interface Props {
  modelValue: string | null
  options: OptionItem[]
}

const props = withDefaults(defineProps<Props>(), {
  options: () => ([])
})

const emit = defineEmits(['update:modelValue', 'changed'])
const router = useRouter()

const selectedOption = computed<OptionItem | undefined>(
  () => props.options.find((option) => option.key === props.modelValue)
)

const selectedValue = computed<string>(() => selectedOption.value ? selectedOption.value.title : '')

function onClick (option: OptionItem) {
  emit('update:modelValue', option.key)

  emit('changed', option)
}

const isExpanded = ref(false)
</script>