<template>
  <ui-kit-modal :with-header="false" :with-footer="false" ref="setUpAccountModal">
    <template v-slot:customHeader>
      <header class="account-settings-header">
        <close-icon
          @click="close()"
          class="close-icon ui-kit-box-tools-link account-settings-header-close"
        />

        <label
          for="uploadBackground"
          class="account-settings-header-upload-background flex-center"
        >
          <span v-if="!backgroundImage">
            DROP YOUR HEADER AND PROFILE IMAGE <br />
            IN THE RESPECTIVE FIELDS <br />
            OR CLICK TO BROWSE <br />
            PROFILE HEADER 1050 x 300 PX <br />
          </span>
          <img
            :src="getImageUrl(backgroundImage, ImageTemplate.FullSize)"
            alt="background Image"
            v-if="backgroundImage"
          />
          <input
            id="uploadBackground"
            @change="addFile"
            accept="image/bmp, image/png, image/jpeg"
            type="file"
            ref="file"
          />
        </label>
        <div class="account-settings-tabs">
          <span
            class="account-settings-tabs-tab"
            :style="{ color: seletedTab === 'profile' ? 'white' : undefined }"
            @click="selectTab('profile')"
            >Profile
          </span>
          <span
            class="account-settings-tabs-tab"
            :style="{ color: seletedTab === 'buyer' ? 'white' : undefined }"
            @click="selectTab('buyer')"
            >Buyer
          </span>
          <span
            class="account-settings-tabs-tab"
            :style="{ color: seletedTab === 'seller' ? 'white' : undefined }"
            @click="selectTab('seller')"
            v-if="user.can_add_product"
            >Seller
          </span>
        </div>

        <label for="uploadAvatar" class="account-settings-header-upload-avatar">
          <img
            :src="getUserAvatar(avatar, ImageTemplate.SmallThumbnail)"
            alt="avatar Image"
            v-if="avatar"
          />
          <div class="account-settings-avatar-placeholder">
            <div class="account-settings-avatar-placeholder-body">
              <div class="account-settings-avatar-placeholder-content">800 X 800</div>
            </div>
          </div>
          <input
            id="uploadAvatar"
            @change="addFile"
            accept="image/bmp, image/png, image/jpeg"
            type="file"
            ref="file"
          />
        </label>
      </header>
    </template>

    <template v-slot:content>
      <form
        @submit.prevent="uploadProduct"
        class="account-settings-form"
        v-if="seletedTab === 'profile'"
      >
        <ui-kit-input
          v-model="user.username"
          :errors="v$.user.username"
          :error-messages="{ required: 'Username is required' }"
          :disabled="store.pendingRequestsCount"
          placeholder="USERNAME"
        />

        <ui-kit-input
          v-model="user.email"
          :errors="v$.user.email"
          :error-messages="{
            required: 'email is required',
            email: 'Please enter valid email address.',
          }"
          :disabled="store.pendingRequestsCount"
          placeholder="EMAIL ADDRESS"
        />

        <ui-kit-selector
          v-model="user.country"
          :options="countries"
          :title="'Country'"
          :disabled="store.pendingRequestsCount"
          :withSearch="true"
        />
        <div class="account-settings-visibility-level">
          <ui-kit-check-box
            v-model="user.product_visibility_level"
            :value="COMMON_VISIBILITY_LEVEL"
            :disabled="store.pendingRequestsCount"
            :title="filtersStore.getById(COMMON_VISIBILITY_LEVEL).filter"
            type="radio"
          />

          <ui-kit-check-box
            v-model="user.product_visibility_level"
            :value="NUDITY_VISIBILITY_LEVEL"
            :disabled="store.pendingRequestsCount"
            :title="filtersStore.getById(NUDITY_VISIBILITY_LEVEL).filter"
            type="radio"
          />

          <ui-kit-check-box
            v-model="user.product_visibility_level"
            :value="EROTIC_VISIBILITY_LEVEL"
            :disabled="store.pendingRequestsCount"
            :title="filtersStore.getById(EROTIC_VISIBILITY_LEVEL).filter"
            type="radio"
          />

          <ui-kit-check-box
            v-model="user.product_visibility_level"
            :value="PORNO_VISIBILITY_LEVEL"
            :disabled="store.pendingRequestsCount"
            :title="filtersStore.getById(PORNO_VISIBILITY_LEVEL).filter"
            type="radio"
          />
        </div>

        <span v-if="error" class="form-error error">
          {{ error }}
        </span>

        <div class="account-settings-divider"></div>

        <p class="ui-kit-box-content-small-text">
          <span class="ui-kit-box-content-success-text">
            If you want to change your password, please <br />
            log out <a href="#" class="link" @click.prevent="logout">here</a> and use the
            "Reset password" function on the "Log in" page.
          </span>
        </p>

        <div class="ui-kit-modal-content-buttons">
          <button
            :disabled="store.pendingRequestsCount"
            class="button full-width"
            type="submit"
          >
            <span>UPDATE SETTINGS</span>
          </button>
        </div>
      </form>
      <form
        @submit.prevent="updateBuyerSettings"
        class="account-settings-form"
        v-if="seletedTab === 'buyer'"
      >
        <ui-kit-input
          :errors="v_i$.user.inv_name"
          :error-messages="{ required: 'Invoice Name is required' }"
          :disabled="store.pendingRequestsCount"
          placeholder="INVOICE NAME"
          v-model="user.inv_name"
        />

        <ui-kit-input
          :errors="v_i$.user.inv_address"
          :error-messages="{ required: 'Invoice Address is required' }"
          :disabled="store.pendingRequestsCount"
          placeholder="INVOICE ADDRESS"
          v-model="user.inv_address"
        />

        <ui-kit-input
          :errors="v_i$.user.inv_address2"
          :error-messages="{ required: 'Invoice Address 2 is required' }"
          :disabled="store.pendingRequestsCount"
          placeholder="INVOICE ADDRESS 2"
          v-model="user.inv_address2"
        />
        <ui-kit-input
          :errors="v_i$.user.inv_state"
          :error-messages="{ required: 'Invoice State is required' }"
          :disabled="store.pendingRequestsCount"
          placeholder="INVOICE STATE"
          v-model="user.inv_state"
        />
        <!-- <div class="account-settings-tabs-buyer">
          <div class="account-settings-tabs-buyer-zip"> -->
        <ui-kit-input
          :errors="v_i$.user.inv_zip"
          :error-messages="{ required: 'Invoice Zip is required' }"
          :disabled="store.pendingRequestsCount"
          placeholder="INVOICE ZIP"
          v-model="user.inv_zip"
        />
        <!-- </div>
          <div class="account-settings-tabs-buyer-city"> -->
        <ui-kit-input
          :errors="v_i$.user.inv_city"
          :error-messages="{ required: 'Invoice City is required' }"
          :disabled="store.pendingRequestsCount"
          placeholder="INVOICE CITY"
          v-model="user.inv_city"
        />
        <!-- </div>
        </div> -->
        <ui-kit-selector
          v-model="user.inv_country"
          :options="countries"
          :title="'INVOICE COUNTRY'"
          :disabled="store.pendingRequestsCount"
          :withSearch="true"
        />

        <ui-kit-input
          :errors="v_i$.user.inv_phone"
          :error-messages="{ required: 'Invoice Phone is required' }"
          :disabled="store.pendingRequestsCount"
          placeholder="INVOICE PHONE"
          v-model="user.inv_phone"
        />

        <ui-kit-input
          :errors="v_i$.user.inv_email"
          :error-messages="{ required: 'Invoice Email is required' }"
          :disabled="store.pendingRequestsCount"
          placeholder="INVOICE EMAIL"
          v-model="user.inv_email"
        />
        <ui-kit-input
          :disabled="store.pendingRequestsCount"
          placeholder="INVOICE ATTENTION"
          v-model="user.inv_att"
        />
        <hr class="divide" />
        <div class="differnt-address">
          <ui-kit-check-box
            v-model="isDifferentDeliveryAddress"
            :value="'DELIVER ADDRESS (If different)'"
            :disabled="store.pendingRequestsCount"
            :title="'DELIVER ADDRESS (If different)'"
            type="checkbox"
          />
        </div>

        <div v-if="isDifferentDeliveryAddress">
          <ui-kit-input
            :errors="v_d$.user.dev_name"
            :error-messages="{ required: 'Deliver Name is required' }"
            :disabled="store.pendingRequestsCount"
            placeholder="DELIVER NAME"
            v-model="user.dev_name"
          />

          <ui-kit-input
            :errors="v_d$.user.dev_address"
            :error-messages="{ required: 'Deliver Address is required' }"
            :disabled="store.pendingRequestsCount"
            placeholder="DELIVER ADDRESS"
            v-model="user.dev_address"
          />

          <ui-kit-input
            :disabled="store.pendingRequestsCount"
            placeholder="DELIVER ADDRESS 2"
            v-model="user.dev_address2"
          />
          <ui-kit-input
            :errors="v_d$.user.dev_state"
            :error-messages="{ required: 'Deliver State is required' }"
            :disabled="store.pendingRequestsCount"
            placeholder="DELIVER STATE"
            v-model="user.dev_state"
          />
          <!-- <div class="account-settings-tabs-buyer">
            <div class="account-settings-tabs-buyer-zip"> -->
          <ui-kit-input
            :errors="v_d$.user.dev_zip"
            :error-messages="{ required: 'Deliver Zip is required' }"
            :disabled="store.pendingRequestsCount"
            placeholder="DELIVER ZIP"
            v-model="user.dev_zip"
          />
          <!-- </div>
            <div class="account-settings-tabs-buyer-city"> -->
          <ui-kit-input
            :errors="v_d$.user.dev_city"
            :error-messages="{ required: 'Deliver City is required' }"
            :disabled="store.pendingRequestsCount"
            placeholder="DELIVER CITY"
            v-model="user.dev_city"
          />
          <!-- </div>
          </div> -->
          <ui-kit-selector
            v-model="user.dev_country"
            :options="countries"
            :title="'DELIVER COUNTRY'"
            :disabled="store.pendingRequestsCount"
            :withSearch="true"
          />

          <ui-kit-input
            :errors="v_d$.user.dev_phone"
            :error-messages="{ required: 'Deliver Phone is required' }"
            :disabled="store.pendingRequestsCount"
            placeholder="DELIVER PHONE"
            v-model="user.dev_phone"
          />

          <ui-kit-input
            :errors="v_d$.user.dev_email"
            :error-messages="{ required: 'Deliver Email is required' }"
            :disabled="store.pendingRequestsCount"
            placeholder="DELIVER EMAIL"
            v-model="user.dev_email"
          />
          <ui-kit-input
            :disabled="store.pendingRequestsCount"
            placeholder="DELIVER ATTENTION"
            v-model="user.dev_att"
          />
        </div>
        <div class="ui-kit-modal-content-buttons">
          <button
            :disabled="store.pendingRequestsCount"
            class="button full-width"
            type="submit"
          >
            <span>UPDATE SETTINGS</span>
          </button>
        </div>
      </form>
      <form
        @submit.prevent="updateSellerSettings"
        class="account-settings-form"
        v-if="seletedTab === 'seller' && user.can_add_product"
      >
        <div class="connet-stripe">
          <button class="button connect-stripe-button full-width" @click="connectStripe">
            <span>Connect Stripe</span>
          </button>
        </div>
        <ui-kit-input
          :errors="v_s$.user.sel_name"
          :error-messages="{ required: 'Seller Name is required' }"
          :disabled="store.pendingRequestsCount"
          placeholder="SELLER NAME"
          v-model="user.sel_name"
        />
        <ui-kit-input
          :errors="v_s$.user.sel_address"
          :error-messages="{ required: 'Deliver Address is required' }"
          :disabled="store.pendingRequestsCount"
          placeholder="SELLER ADDRESS"
          v-model="user.sel_address"
        />

        <ui-kit-input
          :disabled="store.pendingRequestsCount"
          placeholder="SELLER ADDRESS 2"
          v-model="user.sel_address2"
        />
        <ui-kit-input
          :errors="v_s$.user.sel_state"
          :error-messages="{ required: 'Seller State is required' }"
          :disabled="store.pendingRequestsCount"
          placeholder="SELLER STATE"
          v-model="user.sel_state"
        />
        <!-- <div class="account-settings-tabs-buyer">
            <div class="account-settings-tabs-buyer-zip"> -->
        <ui-kit-input
          :errors="v_s$.user.sel_zip"
          :error-messages="{ required: 'Seller Zip is required' }"
          :disabled="store.pendingRequestsCount"
          placeholder="SELLER ZIP"
          v-model="user.sel_zip"
        />
        <!-- </div>
            <div class="account-settings-tabs-buyer-city"> -->
        <ui-kit-input
          :errors="v_s$.user.sel_city"
          :error-messages="{ required: 'Seller City is required' }"
          :disabled="store.pendingRequestsCount"
          placeholder="SELLER CITY"
          v-model="user.sel_city"
        />
        <!-- </div>
          </div> -->
        <ui-kit-selector
          v-model="user.sel_country"
          :options="countries"
          :title="'SELLER COUNTRY'"
          :disabled="store.pendingRequestsCount"
          :withSearch="true"
        />

        <ui-kit-input
          :disabled="store.pendingRequestsCount"
          placeholder="SELLER PHONE"
          v-model="user.sel_phone"
        />

        <ui-kit-input
          :errors="v_s$.user.sel_email"
          :error-messages="{ required: 'Seller Email is required' }"
          :disabled="store.pendingRequestsCount"
          placeholder="SELLER EMAIL"
          v-model="user.sel_email"
        />
        <ui-kit-input
          :disabled="store.pendingRequestsCount"
          placeholder="SELLER ATTENTION"
          v-model="user.sel_att"
        />
        <ui-kit-text-area
          v-model="user.description"
          :disabled="store.pendingRequestsCount"
          placeholder="SELLER DESCRIPTION"
          v-if="user.can_add_product"
        />
        <ui-kit-input
          v-model="user.external_link"
          :disabled="store.pendingRequestsCount"
          placeholder="EXTERNAL LINK"
          v-if="user.can_add_product"
        />
        <div class="addmore" v-if="user.can_add_product">
          <plus-icon @click="addField()" class="account-settings-plus-icon" />
          <ui-kit-input
            v-for="(link, k) in moreexternal_link"
            placeholder="EXTERNAL LINK"
            :modelValue="link"
            v-model="moreexternal_link[k]"
          >
            <div class="account-settings-form-icons">
              <minus-icon class="account-settings-minus-icon" @click="removeField(k)" />
            </div>
          </ui-kit-input>
          <div></div>
        </div>
        <div class="ui-kit-modal-content-buttons">
          <button
            :disabled="store.pendingRequestsCount"
            class="button full-width"
            type="submit"
          >
            <span>UPDATE SETTINGS</span>
          </button>
        </div>
      </form>
    </template>
  </ui-kit-modal>
</template>

<script setup lang="ts">
import { useAsyncData } from "#app";
import { ref } from "@vue/reactivity";
import {
  COMMON_VISIBILITY_LEVEL,
  EROTIC_VISIBILITY_LEVEL,
  NUDITY_VISIBILITY_LEVEL,
  PORNO_VISIBILITY_LEVEL,
  ImageTemplate,
} from "~/types/constants";
import { useStore } from "~/store";
import { useUserStore } from "~/store/user";
import { storeToRefs } from "pinia";
import { useMediaStore } from "~/store/media";
import { useAuthStore } from "~/store/auth";
import { required, email } from "@vuelidate/validators";
import { navigateTo } from "#app";
import UiKitModal from "~/components/UiKit/UiKitModal.vue";
import CloseIcon from "~/assets/svg/close.svg";
import PlusIcon from "~/assets/svg/plus.svg";
import MinusIcon from "~/assets/svg/minus.svg";
import UiKitInput from "~/components/UiKit/UiKitInput.vue";
import useMedia from "~/composable/media";
import axios from "axios";
import UiKitSelector from "~/components/UiKit/UiKitSelector.vue";
import useVuelidate from "@vuelidate/core";
import { useFiltersStore } from "~/store/filters";

const setUpAccountModal = ref<InstanceType<typeof UiKitModal>>();
const seletedTab = ref("profile");
const isDifferentDeliveryAddress = ref(false);
const store = useStore();
const userStore = useUserStore();
const filtersStore = useFiltersStore();
const authStore = useAuthStore();
const currentProfile = storeToRefs(userStore);
const mediaStore = useMediaStore();
const { getUserAvatar, getImageUrl } = useMedia();
const moreexternal_link = reactive(currentProfile.more_external_link);
const countries = ref([{ title: currentProfile.country, key: currentProfile.country }]);
const backgroundImage = ref(currentProfile.background_image);
const avatar = ref(currentProfile.avatar_image);
const error = ref("");
const user = reactive({
  id: currentProfile?.id,
  username: currentProfile.username,
  email: currentProfile.email,
  description: currentProfile.description,
  external_link: currentProfile.external_link,
  product_visibility_level: currentProfile.product_visibility_level,
  background_image_id: currentProfile.background_image_id,
  avatar_image_id: currentProfile.avatar_image_id,
  country: currentProfile.country,
  more_external_link: currentProfile.more_external_link,
  can_add_product: currentProfile?.can_add_product,
  inv_name: currentProfile?.inv_name,
  inv_email: currentProfile?.inv_email,
  inv_address: currentProfile?.inv_address,
  inv_address2: currentProfile?.inv_address2,
  inv_zip: currentProfile?.inv_zip,
  inv_state: currentProfile?.inv_state,
  inv_city: currentProfile?.inv_city,
  inv_country: currentProfile?.inv_country,
  inv_phone: currentProfile?.inv_phone,
  inv_att: currentProfile?.inv_att,
  dev_name: currentProfile?.dev_name,
  dev_email: currentProfile?.dev_email,
  dev_address: currentProfile?.dev_address,
  dev_address2: currentProfile?.dev_address2,
  dev_zip: currentProfile?.dev_zip,
  dev_state: currentProfile?.dev_state,
  dev_city: currentProfile?.dev_city,
  dev_country: currentProfile?.dev_country,
  dev_phone: currentProfile?.dev_phone.toString(),
  dev_att: currentProfile?.dev_att,
  sel_name: currentProfile?.sel_name,
  sel_email: currentProfile?.sel_email,
  sel_address: currentProfile?.sel_address,
  sel_address2: currentProfile?.sel_address2,
  sel_zip: currentProfile?.sel_zip,
  sel_state: currentProfile?.sel_state,
  sel_city: currentProfile?.sel_city,
  sel_country: currentProfile?.sel_country,
  sel_phone: currentProfile?.sel_phone,
  sel_att: currentProfile?.sel_att,
});
const v$ = useVuelidate(
  {
    user: {
      username: { required },
      email: { email, required },
    },
  },
  { user }
);
const v_i$ = useVuelidate(
  {
    user: {
      inv_name: { required },
      inv_address: { required },
      inv_zip: { required },
      inv_city: { required },
      inv_state: { required },
      inv_country: { required },
      inv_phone: { required },
      inv_email: { email, required },
      // inv_att: { required },
    },
  },
  { user }
);
const v_d$ = useVuelidate(
  {
    user: {
      dev_name: { required },
      dev_address: { required },
      dev_zip: { required },
      dev_city: { required },
      dev_state: { required },
      dev_country: { required },
      // dev_phone: { required },
      dev_email: { email, required },
      // dev_att: { required },
    },
  },
  { user }
);
const v_s$ = useVuelidate(
  {
    user: {
      sel_name: { required },
      sel_address: { required },
      sel_zip: { required },
      sel_city: { required },
      sel_state: { required },
      sel_country: { required },
      sel_email: { email, required },
      // dev_att: { required },
    },
  },
  { user }
);

async function addFile(event: any) {
  const media = event.target.files || event.dataTransfer.files;

  if (!media.length) {
    return;
  }

  const response = await mediaStore.upload(media[0], media[0].name);

  if (event.target.id === "uploadBackground") {
    backgroundImage.value = response.data;
    user.background_image_id = response.data.id;

    return;
  }
  if (event.target.id === "uploadAvatar") {
    avatar.value = response.data;
    user.avatar_image_id = response.data.id;
    return;
  }
}

async function addField() {
  moreexternal_link.value.push("");
}

async function removeField(index: any) {
  moreexternal_link.value.splice(index, 1);
}

async function uploadProduct() {
  v$.value.$touch();

  if (v$.value.$error) {
    return;
  }

  try {
    user.more_external_link = moreexternal_link.value.filter((link) => link !== "");
    await userStore
      .updateProfile({
        id: user?.id,
        username: user.username,
        email: user.email,
        description: user.description,
        external_link: user.external_link,
        product_visibility_level: user.product_visibility_level,
        background_image_id: user.background_image_id,
        avatar_image_id: user.avatar_image_id,
        country: user.country,
        more_external_link: user.more_external_link,
        can_add_product: user?.can_add_product,
      })
      .then(close);
  } catch (e: any) {
    if (e.response && !e.response.data.errors) {
      error.value = "Something went wrong! Please try again later.";

      return;
    }
  }
}
async function updateBuyerSettings() {
  v_i$.value.$touch();

  if (v_i$.value.$error) {
    console.log(v_i$.value.$error);
    return;
  }
  if (isDifferentDeliveryAddress.value) {
    v_d$.value.$touch();

    if (v_d$.value.$error) {
      return;
    }
  }

  try {
    user.more_external_link = moreexternal_link.value.filter((link) => link !== "");
    await userStore
      .updateProfile({
        id: user?.id,
        username: user.username,
        email: user.email,
        description: user.description,
        external_link: user.external_link,
        product_visibility_level: user.product_visibility_level,
        background_image_id: user.background_image_id,
        avatar_image_id: user.avatar_image_id,
        country: user.country,
        more_external_link: user.more_external_link,
        can_add_product: user?.can_add_product,
        inv_name: user?.inv_name,
        inv_email: user?.inv_email,
        inv_address: user?.inv_address,
        inv_address2: user?.inv_address2,
        inv_zip: user?.inv_zip,
        inv_state: user?.inv_state,
        inv_city: user?.inv_city,
        inv_country: user?.inv_country,
        inv_phone: user?.inv_phone,
        inv_att: user?.inv_att,
        dev_name: isDifferentDeliveryAddress.value ? user?.dev_name : "",
        dev_email: isDifferentDeliveryAddress.value ? user?.dev_email : "",
        dev_address: isDifferentDeliveryAddress.value ? user?.dev_address : "",
        dev_address2: isDifferentDeliveryAddress.value ? user?.dev_address2 : "",
        dev_zip: isDifferentDeliveryAddress.value ? user?.dev_zip : "",
        dev_state: isDifferentDeliveryAddress.value ? user?.dev_state : "",
        dev_city: isDifferentDeliveryAddress.value ? user?.dev_city : "",
        dev_country: isDifferentDeliveryAddress.value ? user?.dev_country : "",
        dev_phone: isDifferentDeliveryAddress.value ? user?.dev_phone : null,
        dev_att: isDifferentDeliveryAddress.value ? user?.dev_att : "",
      })
      .then(close);
  } catch (e: any) {
    if (e.response && !e.response.data.errors) {
      error.value = "Something went wrong! Please try again later.";

      return;
    }
  }
}
async function updateSellerSettings() {
  v_s$.value.$touch();
  if (v_s$.value.$error) {
    console.log(v_s$.value.$error);
    return;
  }
  try {
    user.more_external_link = moreexternal_link.value.filter((link) => link !== "");
    await userStore
      .updateProfile({
        id: user?.id,
        username: user.username,
        email: user.email,
        description: user.description,
        external_link: user.external_link,
        product_visibility_level: user.product_visibility_level,
        background_image_id: user.background_image_id,
        avatar_image_id: user.avatar_image_id,
        country: user.country,
        more_external_link: user.more_external_link,
        can_add_product: user?.can_add_product,
        sel_name: user?.sel_name,
        sel_email: user?.sel_email,
        sel_address: user?.sel_address,
        sel_address2: user?.sel_address2,
        sel_zip: user?.sel_zip,
        sel_state: user?.sel_state,
        sel_city: user?.sel_city,
        sel_country: user?.sel_country,
        sel_phone: user?.sel_phone,
        sel_att: user?.sel_att,
      })
      .then(close);
  } catch (e: any) {
    if (e.response && !e.response.data.errors) {
      error.value = "Something went wrong! Please try again later.";

      return;
    }
  }
}

function selectTab(data: string) {
  seletedTab.value = data;
}

function logout() {
  authStore.logout();
  navigateTo("/");
  close();
}

async function open() {
  seletedTab.value = "profile";
  await filtersStore.fetchAll();
  setUpAccountModal.value?.open();
  if (countries.value.length <= 1) {
    const response = await axios.get("https://restcountries.com/v2/all");
    response.data.forEach((country: object) =>
      countries.value.push({ title: country.name, key: country.name })
    );
  }
}
async function openBuyer() {
  seletedTab.value = "buyer";
  await filtersStore.fetchAll();
  setUpAccountModal.value?.open();
  if (countries.value.length <= 1) {
    const response = await axios.get("https://restcountries.com/v2/all");
    response.data.forEach((country: object) =>
      countries.value.push({ title: country.name, key: country.name })
    );
  }
}

function close() {
  setUpAccountModal.value?.close();
}
async function connectStripe({ redirect }: { redirect: string }) {
  try {
    const res = await authStore.connectStrip(user?.id);
    if (res.strip_account_link) {
      return window.open(res.strip_account_link, "_blank");
    }
  } catch (error) {}
}

defineExpose({ open, close, openBuyer });
</script>
