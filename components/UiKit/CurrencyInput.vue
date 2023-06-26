<template>
  <div class="add-custom-field">
    <fieldset class="form-group">
      <the-mask
        v-if="mask"
        :mask="mask"
        :max="max"
        :min="min"
        :name="name"
        :type="type"
        :model-value="modelValue"
        :class="{ 'form-control-filled': model }"
        :disabled="props.disabled"
        autocomplete="off"
        class="form-control"
        @update:modelValue="onChanged"
        @blur="onBlur"
      />

      <div :for="name" class="form-field" v-else>
        <span
          v-if="prefix"
          :class="{ 'form-prefix-filled': model && prefix }"
          class="form-prefix"
        >
          {{ prefix }}
        </span>

        <input
          type="text"
          ref="inputRef"
          :class="{
            'form-control-filled': model || model === 0 || type === 'date',
            'form-control-prefix': model && prefix
          }"
          class="form-control"
          v-model="model"
          @blur="onBlur"
        />

        <span class="form-label">
          <span v-if="placeholder" :for="name" class="form-label-content">
            {{ placeholder }}
          </span>
        </span>
        
      </div>
      <slot></slot>

      <span v-if="attentionMessages && !errors.$error" class="form-attentions-list">
        <span
          v-for="(message, key) in attentionMessages"
          v-html="message"
          :key="key"
          class="form-attention"
        ></span>
        <br>
      </span>

      <span v-if="errors.$error || serverErrors[props.name]" class="form-errors-list">
        <span
          v-for="(message, key) in errorMessages"
          v-show="errors[key].$invalid"
          v-html="message"
          :key="key"
          class="form-error error"
        ></span>

        <span
          v-for="(message, key) in serverErrors[props.name]"
          v-show="serverErrors && serverErrors[props.name]"
          v-html="message"
          :key="key"
          class="form-error error"
        ></span>
      </span>
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
import TheMask from 'vue-the-mask'
import { defineEmits } from 'vue'
import { CurrencyInputOptions, useCurrencyInput } from 'vue-currency-input'

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
  errors?: object,
  errorMessages?: object,
  serverErrors?: object,
  attentionMessages?: object
  disabled?: number
  prefix: string
  options: Options
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
    valueRange: {min: 0, max: undefined},
    useGrouping: true,
    currencyDisplay: 'symbol',
    accountingSign: false
    
  },
  errors: () => ({ $error: false }),
  errorMessages: () => ({}),
  serverErrors: () => ({})
})

const model = ref(props.modelValue)

const emit = defineEmits(['update:modelValue'])

const { inputRef, setOptions, setValue } = useCurrencyInput(props.options as CurrencyInputOptions)

let timeout: any = null

watch(() => props.options, (options) => {
  setOptions(options as CurrencyInputOptions)
})

watch(() => props.modelValue, (modelValue) => {
  setValue(modelValue)
})

function onBlur(event: any) {
  emit('update:modelValue', model.value)
}

</script>
