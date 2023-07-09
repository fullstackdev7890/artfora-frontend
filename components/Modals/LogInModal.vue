<template>
  <ui-kit-modal
    :with-footer="false"
    :close-btn-as-home-link="route.name === 'enter-new-password'"
    title="Log in"
    ref="logInModal"
    class="auth-modal"
  >
    <template v-slot:content>
      <form @submit.prevent="logIn">
        <p class="ui-kit-box-content-small-text">
          Don't have an account?
          <span class="link" @click="openPreSignUpModal">Sign up here!</span>
        </p>

        <ui-kit-input
          v-model="auth.login"
          :errors="v$.auth.login"
          :server-errors="serverErrors"
          :disabled="store.pendingRequestsCount"
          placeholder="EMAIL ADDRESS"
          name="login"
        />
        <!-- :error-messages="{ required: 'Please enter email. ', email: 'Please enter valid email address. ' }" -->

        <ui-kit-input
          v-model="auth.password"
          :errors="v$.auth.password"
          :server-errors="serverErrors"
          :disabled="store.pendingRequestsCount"
          placeholder="PASSWORD"
          name="password"
          type="password"
        />
        <!-- :error-messages="{ required: 'Please enter password. ' }" -->

        <span v-if="error" class="form-errors-list">
          <span class="form-error error login-error">
            Either your email address or your password seems to be wrong. Try again or
            <span class="link" @click="openResetPasswordModal">
              reset password here!
            </span>
          </span>
        </span>
        <ui-kit-check-box
          v-model="auth.remember_me"
          :value="'Remember me'"
          :disabled="store.pendingRequestsCount"
          :title="'Remember me'"
          type="checkbox"
        />

        <p v-if="!error" class="ui-kit-box-content-small-text align-right">
          Forgot your password?
          <span class="link" @click="openResetPasswordModal">Reset here!</span>
        </p>

        <div class="ui-kit-modal-content-buttons">
          <button
            :disabled="store.pendingRequestsCount"
            class="button button-grey full-width"
            type="submit"
          >
            <span>Log in</span>
          </button>
        </div>
      </form>
    </template>
  </ui-kit-modal>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { required, email } from "@vuelidate/validators";
import { useRoute } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { useAuthStore } from "~/store/auth";
import { useStore } from "~/store";
import type { LoginData } from "~/types/auth";
import UiKitModal from "~/components/UiKit/UiKitModal.vue";
import UiKitInput from "~/components/UiKit/UiKitInput.vue";
import UiKitCheckBox from "~/components/UiKit/UiKitCheckBox.vue";

const logInModal = ref<InstanceType<typeof UiKitModal>>(null);
const authStore = useAuthStore();
const store = useStore();
const route = useRoute();
const emit = defineEmits([
  "openSignUpModal",
  "openPreSignUpModal",
  "openTwoFactorAuthModal",
  "openResetPasswordModal",
]);
const remember_me = ref(false);
const auth: LoginData = reactive({
  login: "",
  password: "",
  remember_me: remember_me.value,
});

let error = ref(false);
let serverErrors = ref({});
let success = ref(false);

const v$ = useVuelidate(
  {
    auth: {
      login: { required, email },
      password: { required },
    },
  },
  { auth }
);

async function logIn() {


  v$.value.$touch();

  if (v$.value.$error) {
    return;
  }

  error.value = false;
  serverErrors.value = {};

  try {
    await authStore.login(auth);

    success.value = true;

    openTwoFactorAuthModal();
  } catch (e) {
    if (e.response && !e.response.data.errors) {
      error.value = true;

      return;
    }

    serverErrors.value = e.response.data.errors;
  }
}

function openSignUpModal() {
  close();
  emit("openSignUpModal");
}

function openPreSignUpModal() {
  close();
  emit("openPreSignUpModal");
}

function openResetPasswordModal() {
  close();
  emit("openResetPasswordModal");
}

function openTwoFactorAuthModal() {
  close();
  emit("openTwoFactorAuthModal");
}

function open() {
  auth.login = "";
  auth.password = "";
  auth.remember_me = false;

  logInModal.value?.open();
}

function close() {
  logInModal.value?.close();
}

defineExpose({ open, close });
</script>
