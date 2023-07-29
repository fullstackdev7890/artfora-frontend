<template>
  <div class="add-custom-field">
    <fieldset class="form-group">
      <the-mask v-if="mask" :mask="mask" :max="max" :min="min" :name="name" :type="type" :model-value="modelValue"
        :class="{ 'form-control-filled': modelValue }" :disabled="props.disabled" autocomplete="off" class="form-control"
        @update:modelValue="onChanged" @blur="onBlur" />

      <div :for="name" class="form-field" v-else>
        <span v-if="prefix" :class="{ 'form-prefix-filled': modelValue && prefix }" class="form-prefix">
          {{ prefix }}
        </span>

        <input type="text" ref="inputRef" :class="{
          'form-control-filled': modelValue || modelValue === 0 || type === 'date',
          'form-control-prefix': modelValue && prefix
        }" class="form-control" @blur="onBlur" />
        <span v-if="isPopover" class="text-popover">{{ popoverText }}</span>

        <span class="form-label">
          <span v-if="placeholder" :for="name" class="form-label-content">
            {{ placeholder }}
          </span>
        </span>

      </div>
      <slot></slot>

      <span v-if="attentionMessages && !errors.$error" class="form-attentions-list">
        <span v-for="(message, key) in attentionMessages" v-html="message" :key="key" class="form-attention"></span>
        <br>
      </span>

      <span v-if="errors.$error || serverErrors[props.name]" class="form-errors-list">
        <span v-for="(message, key) in errorMessages" v-show="errors[key].$invalid" v-html="message" :key="key"
          class="form-error error"></span>

        <span v-for="(message, key) in serverErrors[props.name]" v-show="serverErrors && serverErrors[props.name]"
          v-html="message" :key="key" class="form-error error"></span>
      </span>
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
import TheMask from 'vue-the-mask'
import { defineEmits, computed } from 'vue'
import { CurrencyInputOptions, useCurrencyInput } from 'vue-currency-input'
import { ModalsAboutArtforaModal } from '~~/.nuxt/components'

type Options = {
  currency: string,
  locale: string,
  autoDecimalDigitsEnabled: boolean,
  autoDecimalDigits: boolean,
  precision: number,
  currencyDisplay: string,
  hideCurrencySymbolOnFocus: boolean,
}

interface Props {
  modelValue: number,
  placeholder: string,
  mask?: string,
  title?: string,
  name?: string,
  type?: string,
  step?: number,
  timeout?: number,
  errors?: object,
  errorMessages?: object,
  serverErrors?: object,
  attentionMessages?: object
  disabled?: number
  prefix: string
  options: Options,
  onlyInteger: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  options: {
    currency: 'EUR',
    locale: 'de-DE',
    precision: 2,
    hideCurrencySymbolOnFocus: true,
    hideGroupingSeparatorOnFocus: true,
    hideNegligibleDecimalDigitsOnFocus: true,
    autoDecimalDigitsEnabled: true,
    autoDecimalDigits: false,
    // valueScaling: 'precision',
    valueRangeEnabled: true,
    valueRange: { min: 0, max: 9999.99 },
    useGrouping: true,
    currencyDisplay: 'hidden',
    accountingSign: false,
    onlyInteger: false
  },
  timeout: 0,

  errors: () => ({ $error: false }),
  errorMessages: () => ({}),
  serverErrors: () => ({})
})
const model = ref(props.modelValue)
const isPopover = ref(false)
const popoverText = ref("")

const emit = defineEmits(['update:modelValue'])

const { inputRef, setOptions, setValue, numberValue, formattedValue } = useCurrencyInput(props.options as CurrencyInputOptions)

watch(() => props.options, (options) => {
  setOptions(options as CurrencyInputOptions)
})

watch(() => props.modelValue, (modelValue) => {
  setValue(modelValue)
})

watch(() => numberValue.value, (newValue: number | null) => {
  if (newValue === null) return;
  if (newValue > props.options.valueRange.max) {
    popoverText.value = `Max is ${props.options.valueRange.max}.`
    isPopover.value = true
  }
  else if (newValue < props.options.valueRange.min) {
    popoverText.value = `Min is ${props.options.valueRange.min}.`
    isPopover.value = true
  } else {
    isPopover.value = false
    popoverText.value = ''
  }
})
function onBlur() {
  emit('update:modelValue', numberValue)
}
function input($event: any) {
  let value = props.mask ? $event : $event.target.value;

  if (props.type === "number") {
    value = parseFloat(value);
  }

  // emit("update:modelValue", value);
}
function onChanged(value: any) {
  if (props.timeout) {
    clearTimeout(timeout);

    timeout = setTimeout(() => input(value), props.timeout);
  } else {
    input(value);
  }
}

</script>
