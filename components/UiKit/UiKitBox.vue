<template>
  <div>
    <div
      v-if="!isClosed"
      class="ui-kit-box"
    >
      <div
        v-if="withHeader"
        class="ui-kit-box-title"
      >
        <h5>{{ title }}</h5>

        <div :class="{ open: isOptionsShown }" class="ui-kit-box-tools">
          <a
            v-if="showCollapseButton"
            :class="{ 'fa-chevron-down': isCollapsed, 'fa-chevron-up': !isCollapsed }"
            @click="toggleCollapsing()"
            class="ui-kit-box-tools-link fa"
          ></a>

          <a
            v-for="button in customButtons"
            :class="button.class"
            @click="$emit(button.event)"
            class="ui-kit-box-tools-link fa">
          </a>

          <a
            v-if="options.length"
            @click="isOptionsShown = !isOptionsShown"
            @blur="isOptionsShown = !isOptionsShown"
            class="ui-kit-box-dropdown-toggle fa fa-wrench">
          </a>

          <ul v-if="isOptionsShown" class="ui-kit-box-dropdown-menu">
            <li v-for="option in options">
              <a @click="$emit(option.event)">
                {{ option.title }}
              </a>
            </li>
          </ul>

          <close-icon
            v-if="showCloseButton"
            @click="close()"
            class="close-icon ui-kit-box-tools-link"
          />
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
import { ref } from '@vue/reactivity'
import { UiKitCustomButton, UiKitBoxOption } from '~/types/uiKit'
import CloseIcon from '~/assets/svg/close.svg'

interface Props {
  title?: string
  showCloseButton?: boolean
  showCollapseButton?: boolean
  showOptionsButton?: boolean
  withFooter?: boolean
  withHeader?: boolean
  collapsed?: boolean
  customButtons?: UiKitCustomButton[]
  options?: UiKitBoxOption[]
}

const props = withDefaults(defineProps<Props>(), {
  showCloseButton: true,
  showCollapseButton: false,
  showOptionsButton: true,
  withFooter: false,
  withHeader: false,
  collapsed: false,
  customButtons: () => ([]),
  options: () => ([])
})

const emit = defineEmits(['close', 'collapse', 'expand'])

let isClosed = ref(false)
let isOptionsShown = ref(false)
let isCollapsed = ref(props.collapsed)

function close() {
  emit('close')

  isClosed.value = true
}

function toggleCollapsing() {
  isCollapsed.value = !isCollapsed.value

  if (isCollapsed.value) {
    emit('collapse')
  } else {
    emit('expand')
  }
}
</script>