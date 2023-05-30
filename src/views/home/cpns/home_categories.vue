<template>
  <div class="home_categories">
    <template v-for="item in categories" :key="item.id">
      <div class="category">
        <img :src="item.pictureUrl" alt="">
        <div class="text">{{ item.title }}</div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { useHomeStore } from '@/stores/modules/home';
import { storeToRefs } from 'pinia';

const homeStore = useHomeStore()
const { categories } = storeToRefs(homeStore)
</script>

<style lang="less" scoped>
.home_categories {
  display: flex;
  overflow-x: auto;
  margin: 6px 0px;
  padding: 0px 4px 0px 4px;

  &&::-webkit-scrollbar {
    display: none;
  }

  .category {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0px 12px;
    flex-shrink: 0;

    img {
      width: 30px;
      height: 30px;
    }

    .text {
      font-size: 12px;

    }
  }
}
</style>