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
        :class="{ 'form-control-filled': modelValue }"
        :disabled="props.disabled"
        autocomplete="off"
        class="form-control"
        @update:modelValue="onChanged"
      />

      <div :for="name" class="form-field" v-else>
        <span
          v-if="prefix"
          :class="{ 'form-prefix-filled': modelValue && prefix }"
          class="form-prefix"
        >
          {{ prefix }}
        </span>

        <input
          :max="max"
          :min="min"
          :step="step"
          :name="name"
          :id="id"
          :type="type"
          :value="modelValue"
          :class="{
            'form-control-filled': modelValue || modelValue === 0 || type === 'date',
            'form-control-prefix': modelValue && prefix,
          }"
          :disabled="props.disabled"
          placeholder=""
          autocomplete="off"
          class="form-control"
          @input="onChanged"
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
        <br />
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
import TheMask from "vue-the-mask";
import { defineEmits } from "vue";
import { useAuthStore } from "~~/store/auth";
const authStore = useAuthStore();
interface Props {
  modelValue: string | number;
  placeholder: string;
  mask?: string;
  title?: string;
  name?: string;
  type?: string;
  max?: number;
  min?: number;
  step?: number;
  timeout?: number;
  errors?: object;
  errorMessages?: object;
  serverErrors?: object;
  attentionMessages?: object;
  disabled?: number;
  prefix: string;
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  min: 0,
  step: 1,
  timeout: 0,
  errors: () => ({ $error: false }),
  errorMessages: () => ({}),
  serverErrors: () => ({}),
});

const emit = defineEmits(["update:modelValue"]);

let timeout: any = null;

function input($event: any) {
  let value = props.mask ? $event : $event.target.value;

  if (props.type === "number") {
    value = parseFloat(value);
  }

  emit("update:modelValue", value);
}
// onMounted(() => {
//   var input = document.getElementById(props.id);

//   const autocomplete = new google.maps.places.Autocomplete(input, {
//     types: ["address"],
//   });

//   autocomplete.addListener("place_changed", () => {
//     let place = autocomplete.getPlace();

//     let address1 = ref("");
//     let postcode = ref("");
//     let state = ref("");
//     let country = ref("");
//     let city = ref("");
//     for (const component of place.address_components as google.maps.GeocoderAddressComponent[]) {
//       // @ts-ignore remove once typings fixed
//       const componentType = component.types[0];

//       switch (componentType) {
//         case "street_number": {
//           address1.value = `${component.long_name} ${address1.value}`;
//           break;
//         }

//         case "route": {
//           address1.value += component.short_name;
//           break;
//         }

//         case "postal_code": {
//           postcode.value = `${component.long_name}${postcode.value}`;
//           break;
//         }

//         case "postal_code_suffix": {
//           postcode.value = `${postcode.value}-${component.long_name}`;
//           break;
//         }

//         case "locality":
//           city.value = component.long_name;
//           break;

//         case "administrative_area_level_1": {
//           state.value = component.short_name;
//           break;
//         }

//         case "country":
//           country.value = component.long_name;
//           break;
//       }
//     }
//     if (
//       props.id === "user_inv_address" ||
//       props.id === "user_sel_address" ||
//       props.id === "user_dev_address"
//     ) {
//       authStore.addAddress(props.id, {
//         address: address1.value,
//         city: city.value,
//         country: country.value,
//         state: state.value,
//         postal_code: postcode.value,
//       });
//     }
//   });
// });

function onChanged(value: any) {
  if (props.timeout) {
    clearTimeout(timeout);

    timeout = setTimeout(() => input(value), props.timeout);
  } else {
    input(value);
  }
}
</script>
