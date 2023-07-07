<template>
  <!-- <div v-for="(item, index) in props.items" :key="index"> -->
  <!-- <div
      class="item-title"
      :style="{
        color: item.text_colour,
        paddingBottom: item.text_type === 'divide' ? '2.5rem' : '0.5rem',
      }"
      v-html="item.text_content"
    ></div> -->
  <div
    style="margin-bottom: 10px"
    v-html="tData.text_content.replace(/\n/g, '<br>')"
    v-for="(tData, index) in props.items"
    :key="index"
    :style="{
      color: tData.text_colour,
      padding: tData.text_colour === '#C1C1C1' ? '0.8rem 0' : '0.2rem 0',
      fontWeight: tData.text_colour === '#C1C1C1' ? 'bold' : 'normal',
      fontSize: tData.text_colour === '#C1C1C1' ? '18px' : '16px',
    }"
  ></div>
  <!-- </div> -->
</template>

<script setup lang="ts">
interface item {
  text_name: string;
  text_content: string;
  text_colour: string;
  text_type: string;
  text_order: number;
  admin_user: string;
}
interface Props {
  items: item[];
}

const props = defineProps<Props>();
</script>
