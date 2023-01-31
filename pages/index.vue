<template>
  <main class="home-page">
    <main-container>
<!--      These are test switches. In the future, everything will be done according to the layout through the gallery settings menu-->
      <div style="display: flex; flex-direction: row; justify-content: flex-start;">
        <span style="text-decoration: underline; cursor: pointer; margin: 10px">Justified</span>
        <span style="text-decoration: underline; cursor: pointer; margin: 10px">Square</span>
        <span style="text-decoration: underline; cursor: pointer; margin: 10px">Details</span>
      </div>

      <gallery :cols="galleryImages" :view-type="galleryViewType" />
    </main-container>
  </main>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { useHead } from '@vueuse/head'
import { onMounted } from 'vue'
import MainContainer from '~/components/Layout/MainContainer.vue'
import Gallery from '~/components/Gallery/Gallery.vue'
import { JUSTIFIED_GALLERY_VIEW_TYPE, SQUARE_GALLERY_VIEW_TYPE, DETAILS_GALLERY_VIEW_TYPE } from '~/types/gallery'

const title = ref('')
const description = ref('')
let galleryImages = ref([])
let galleryViewType = ref(DETAILS_GALLERY_VIEW_TYPE)

// test images
const testImages = [
  { url: 'https://images.unsplash.com/photo-1661961110671-77b71b929d52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80', author: 'Test Author', author_tag: '@test_author', author_avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80' },
  { url: 'https://images.unsplash.com/photo-1674755641397-9038ed42636c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80', author: 'Test Author', author_tag: '@test_author', author_avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80' },
  { url: 'https://images.unsplash.com/photo-1674763671434-22b2671c863b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80', author: 'Test Author', author_tag: '@test_author', author_avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80' },
  { url: 'https://images.unsplash.com/photo-1674754666581-4e6657392655?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3264&q=80', author: 'Test Author', author_tag: '@test_author', author_avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80' },
  { url: 'https://images.unsplash.com/photo-1674766322500-8280bbbda97c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1285&q=80', author: 'Test Author', author_tag: '@test_author', author_avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80' },
  { url: 'https://images.unsplash.com/photo-1661961110218-35af7210f803?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80', author: 'Test Author', author_tag: '@test_author', author_avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80' },
  { url: 'https://plus.unsplash.com/premium_photo-1664285182704-edf1458ef76e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80', author: 'Test Author', author_tag: '@test_author', author_avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80' },
  { url: 'https://images.unsplash.com/photo-1674756142722-14266beb51d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2942&q=80', author: 'Test Author', author_tag: '@test_author', author_avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80' },
  { url: 'https://images.unsplash.com/photo-1674590818982-f38fd684a36e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80', author: 'Test Author', author_tag: '@test_author', author_avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80' },
  { url: 'https://images.unsplash.com/photo-1674787433572-37ae9a76555a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3053&q=80', author: 'Test Author', author_tag: '@test_author', author_avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80' },
  { url: 'https://images.unsplash.com/photo-1674813878273-71d20543554a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80', author: 'Test Author', author_tag: '@test_author', author_avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80' },
  { url: 'https://plus.unsplash.com/premium_photo-1670359037518-95e2d90acb06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2164&q=80', author: 'Test Author', author_tag: '@test_author', author_avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80' },
  { url: 'https://images.unsplash.com/photo-1674780550722-922aefa6fa15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80', author: 'Test Author', author_tag: '@test_author', author_avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80' },
  { url: 'https://images.unsplash.com/photo-1674816568560-e5a11db85f58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80', author: 'Test Author', author_tag: '@test_author', author_avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80' },
  { url: 'https://images.unsplash.com/photo-1674820166222-6fd353bd0177?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1284&q=80', author: 'Test Author', author_tag: '@test_author', author_avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80' },
  { url: 'https://images.unsplash.com/photo-1674821503660-9445aab3d662?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80', author: 'Test Author', author_tag: '@test_author', author_avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80' },
  { url: 'https://images.unsplash.com/photo-1674718061623-2d1902f6889d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80', author: 'Test Author', author_tag: '@test_author', author_avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80' },
  { url: 'https://images.unsplash.com/photo-1674788052100-77e2aa1f0e82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80', author: 'Test Author', author_tag: '@test_author', author_avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80' },
  { url: 'https://plus.unsplash.com/premium_photo-1672192166287-af9bb2c4b979?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80', author: 'Test Author', author_tag: '@test_author', author_avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80' },
  { url: 'https://images.unsplash.com/photo-1674769021687-63263e148cd1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80', author: 'Test Author', author_tag: '@test_author', author_avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80' },
];

useHead({
  title: title,
  meta: [
    { name: 'description', content: description },
    { name: 'content-type', content: 'text/html; charset=UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' }
  ]
})

onMounted(() => {
  if (process.client) {
    sortImagesByColumns(testImages)

    window.addEventListener('resize', () => sortImagesByColumns(testImages))
  }
})

function sortImagesByColumns (images) {
  let currentColumn = 1
  let imagesCols: [[], []] | [[], [], [], []]

  if (process.client && window.innerWidth <= 992) {
    imagesCols = [[],[]]
  } else {
    imagesCols = [[], [], [], []]
  }

  images.forEach((item) => {
    imagesCols[currentColumn - 1].push(item)
    currentColumn++

    if (currentColumn > imagesCols.length) {
      currentColumn = 1
    }
  })

  galleryImages.value = imagesCols
}

</script>