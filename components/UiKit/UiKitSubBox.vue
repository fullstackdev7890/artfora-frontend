<template>
  <div>
    <div class="ui-kit-box">
      <div class="ui-kit-box-title" v-if="withHeader">
        <div>
          <slot name="customHeader"></slot>
        </div>

        <div :class="{ open: isOptionsShown }" class="ui-kit-box-tools">
          <a
            v-if="showCollapseButton"
            :class="{ 'fa-chevron-down': isCollapsed, 'fa-chevron-up': !isCollapsed }"
            class="ui-kit-box-tools-link fa"
          ></a>

          <a
            v-for="button in customButtons"
            :class="button.class"
            class="ui-kit-box-tools-link fa"
          >
          </a>

          <a
            v-if="options.length"
            @click="isOptionsShown = !isOptionsShown"
            @blur="isOptionsShown = !isOptionsShown"
            class="ui-kit-box-dropdown-toggle fa fa-wrench"
          >
          </a>

          <ul v-if="isOptionsShown" class="ui-kit-box-dropdown-menu">
            <li v-for="option in options">
              <a>
                {{ option.title }}
              </a>
            </li>
          </ul>

          <!-- <close-icon
            v-if="showCloseButton && !closeBtnAsHomeLink"
            @click="close()"
            class="close-icon ui-kit-box-tools-link"
          /> -->

          <NuxtLink v-if="showCloseButton && closeBtnAsHomeLink" :to="'/'">
            <close-icon class="close-icon ui-kit-box-tools-link" />
          </NuxtLink>
        </div>
      </div>

      <header v-show="!isCollapsed" class="ui-kit-box-heading">
        <slot name="heading"></slot>
      </header>

      <section v-show="!isCollapsed" class="ui-kit-box-content">
        <slot name="content"></slot>
      </section>

      <footer v-if="withFooter" class="ui-kit-box-footer">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UiKitCustomButton, UiKitBoxOption } from "~/types/uiKit";

interface Props {
  showCloseButton?: boolean;
  showCollapseButton?: boolean;
  showOptionsButton?: boolean;
  withFooter?: boolean;
  withHeader?: boolean;
  collapsed?: boolean;
  closeBtnAsHomeLink?: boolean;
  customButtons?: UiKitCustomButton[];
  options?: UiKitBoxOption[];
}

const props = withDefaults(defineProps<Props>(), {
  showCloseButton: true,
  showCollapseButton: false,
  showOptionsButton: true,
  withFooter: false,
  withHeader: false,
  collapsed: false,
  closeBtnAsHomeLink: false,
  customButtons: () => [],
  options: () => [],
});

const emit = defineEmits(["close", "collapse", "expand"]);
</script>
