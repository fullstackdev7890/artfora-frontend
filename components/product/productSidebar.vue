<template>
  <transition name="product-sidebar">
    <div class="product-sidebar">

      <div class="product-sidebar-background">
        <img :src="props.imageInfo.user.background_image" alt="background-image">
      </div>

      <div class="product-sidebar-user">
        <img class="product-sidebar-user-avatar" :src="props.imageInfo.user.media.link" alt="user-avatar">
        <div class="product-sidebar-user-name">
          <h4>{{ props.imageInfo.user.username }}</h4>
          <p>{{ props.imageInfo.user.tagname }}</p>
        </div>
        <div class="product-sidebar-user-share">
          <share-icon class="share-icon" />
        </div>
      </div>

      <div class="product-sidebar-info">
        <div class="product-sidebar-info-item">
          <h5>Title:</h5>
          <span>{{ props.imageInfo.title }}</span>
        </div>
        <div class="product-sidebar-info-item">
          <h5>Artist:</h5>
          <span>{{ props.imageInfo.author }}</span>
        </div>
        <div class="product-sidebar-info-item">
          <h5>Price:</h5>
          <span>€{{ props.imageInfo.price }}</span>
        </div>
        <div class="product-sidebar-info-item">
          <h5>Size:</h5>
          <span>{{ props.imageInfo.width }}/{{ props.imageInfo.height }} cm</span>
        </div>
        <div class="product-sidebar-info-item">
          <h5>Weight:</h5>
          <span>{{ props.imageInfo.weight }}kg</span>
        </div>
      </div>

      <div class="product-sidebar-description">
        Description:
        <p>{{ props.imageInfo.description }}</p>
      </div>

      <button class="product-sidebar-btn">CONTACT</button>
      <button class="product-sidebar-btn">COMMISSION OPEN</button>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { Product } from '~/types/products'
import ShareIcon from '~/assets/svg/share.svg'

interface Props {
  imageInfo: Product
}
const props = withDefaults(defineProps<Props>(), {
  id: 1,
  title: '',
  author: '',
  media: {
    id: 1,
    deleted_at: null,
    created_at: '',
    link: '',
    name: ''
  },
  user: {
    username: '',
    tagname: '',
    background_image: '',
    media: {
      id: 1,
      deleted_at: null,
      created_at: '',
      link: '',
      name: ''
    }
  }
})
</script>