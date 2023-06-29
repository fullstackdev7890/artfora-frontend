<template>
  <div>
    <add-product
      @open-ai-safe-description="openAiSafeDescriptionModal"
      ref="addProductModalRef"
    />
    <CartModal
      @open-cart-modal="openCartModal"
      @open-checkout-modal="openCheckoutModal"
      ref="cartModalRef"
    />
    <checkout-modal
      ref="checkoutModalRef"
    />

    <ai-safe-description-modal
      ref="aiSafeDescriptionModalRef"
    />

    <set-up-account-modal ref="setUpAccountModalRef" />

    <start-selling-modal ref="startSellingModalRef" />

    <sign-up-modal
      ref="signUpModalRef"
      @open-log-in-modal="openLogInModal"
    />

    <pre-sign-up-modal
      ref="preSignUpModalRef"
      @open-sign-up-modal="openSignUpModal"
    />

    <log-in-modal
      ref="logInModalRef"
      @open-pre-sign-up-modal="openPreSignUpModal"
      @open-two-factor-auth-modal="twoFactorAuthModalRef.open()"
      @open-reset-password-modal="resetPasswordModalRef.open()"
    />

    <two-factor-auth-modal
      ref="twoFactorAuthModalRef"
      @open-log-in-modal="openLogInModal"
    />

    <reset-password-modal
      ref="resetPasswordModalRef"
      @open-sign-up-modal="openSignUpModal"
    />

    <gallery-settings-modal
      ref="gallerySettingsModalRef"
      @open-gallery-settings-modal="openGallerySettingsModal"
    />

    <enter-new-password-modal
      ref="enterNewPasswordModalRef"
      @open-log-in-modal="openLogInModal"
    />

    <about-artfora-modal
      ref="aboutArtforaModelRef"
    />
    <faq-modal
    ref="faqModalRef"
    />

    <contact-us-modal ref="contactUsModalRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Product } from '~/types/products'
import { useAuthStore } from '~/store/auth'
import { storeToRefs } from 'pinia'
import SignUpModal from '~/components/Modals/SignUpModal.vue'
import AddProduct from '~/components/Modals/AddProductModal.vue'
import CartModal from '~/components/Modals/CartModal.vue'
import CheckoutModal from '~/components/Modals/CheckoutModal.vue'
import UiKitModal from '~/components/UiKit/UiKitModal.vue'
import LogInModal from '~/components/Modals/LogInModal.vue'
import TwoFactorAuthModal from '~/components/Modals/TwoFactorAuthModal.vue'
import ResetPasswordModal from '~/components/Modals/ResetPasswordModal.vue'
import StartSellingModal from '~/components/Modals/StartSellingModal.vue'
import EnterNewPasswordModal from '~/components/Modals/EnterNewPasswordModal.vue'
import ContactUsModal from '~/components/Modals/ContactModal.vue'
import GallerySettingsModal from '~/components/Modals/GallerySettingsModal.vue'
import SetUpAccountModal from '~/components/Modals/SetUpAccountModal.vue'
import AiSafeDescriptionModal from '~/components/Modals/AiSafeDescriptionModal.vue'
import PreSignUpModal from '~/components/Modals/PreSignUpModal.vue'
import AboutArtforaModal from '~/components/Modals/AboutArtforaModal.vue'
import FaqModal from '~/components/Modals/FAQModal.vue'

const authStore = useAuthStore()
const { isAwaitingTokenConfirmation } = storeToRefs(authStore)

const signUpModalRef = ref<InstanceType<typeof SignUpModal>>(null)
const addProductModalRef = ref<InstanceType<typeof UiKitModal>>(null)
const cartModalRef = ref<InstanceType<typeof UiKitModal>>(null)
const checkoutModalRef= ref<InstanceType<typeof UiKitModal>>(null)
const logInModalRef = ref<InstanceType<typeof LogInModal>>(null)
const twoFactorAuthModalRef = ref<InstanceType<typeof TwoFactorAuthModal>>(null)
const resetPasswordModalRef = ref<InstanceType<typeof ResetPasswordModal>>(null)
const enterNewPasswordModalRef = ref<InstanceType<typeof EnterNewPasswordModal>>(null)
const contactUsModalRef = ref<InstanceType<typeof ContactUsModal>>(null)
const gallerySettingsModalRef = ref<InstanceType<typeof GallerySettingsModal>>(null)
const setUpAccountModalRef = ref<InstanceType<typeof SetUpAccountModal>>(null)
const aiSafeDescriptionModalRef = ref<InstanceType<typeof AiSafeDescriptionModal>>(null)
const preSignUpModalRef = ref<InstanceType<typeof PreSignUpModal>>(null)
const startSellingModalRef = ref<InstanceType<typeof StartSellingModal>>(null)
const aboutArtforaModelRef = ref<InstanceType<typeof AboutArtforaModal>>(null)
const faqModalRef = ref<InstanceType<typeof FaqModal>>(null)

const router = useRouter()
const route = useRoute()

onMounted(() => {
  if (process.client && route.name === 'enter-new-password') {
    enterNewPasswordModalRef.value.open()
  }
})

router.beforeEach((to, from, next) => {
  signUpModalRef.value.close()
  logInModalRef.value.close()
  cartModalRef.value.close()
  twoFactorAuthModalRef.value.close()
  addProductModalRef.value.close()
  resetPasswordModalRef.value.close()
  startSellingModalRef.value.close()
  enterNewPasswordModalRef.value.close()
  contactUsModalRef.value.close()
  gallerySettingsModalRef.value.close()
  setUpAccountModalRef.value.close()
  aiSafeDescriptionModalRef.value.close()
  aboutArtforaModelRef.value.close()
  faqModalRef.value.close()
  checkoutModalRef.value.close()

  next()
})

function openLogInModal() {
  if (isAwaitingTokenConfirmation.value) {
    twoFactorAuthModalRef.value.open()
    return
  }

  logInModalRef.value.open()
}

function openCartModal() {
  cartModalRef.value.open()
}
function openCheckoutModal() {
  checkoutModalRef.value.open()
}
function openSetUpAccountModal() {
  setUpAccountModalRef.value.open()
}

function openSignUpModal() {
  if (isAwaitingTokenConfirmation.value) {
    twoFactorAuthModalRef.value.open()
    return
  }
  signUpModalRef.value.open()
}

function openStartSellingModal() {
  startSellingModalRef.value.open()
}

function openGallerySettingsModal() {
  gallerySettingsModalRef.value.open()
}

function openAddProductModal() {
  addProductModalRef.value.open()
}

function openAboutArtforaModal() {
  aboutArtforaModelRef.value.open()
}
function openFaqModal() {
  faqModalRef.value.open()
}

function openAiSafeDescriptionModal() {
  aiSafeDescriptionModalRef.value.open()
}

function openContactUsModal() {
  contactUsModalRef.value.open()
}

function openPreSignUpModal() {
  preSignUpModalRef.value.open()
}

defineExpose({openCheckoutModal, openCartModal,openAddProductModal, openLogInModal, openSignUpModal, openPreSignUpModal, openContactUsModal, openStartSellingModal, openGallerySettingsModal, openSetUpAccountModal,openAboutArtforaModal,openFaqModal })
</script>