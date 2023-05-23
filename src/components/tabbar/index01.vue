<template>
  <div class="tab_bar">
    <template v-for="(item, index) in tabbarItems" :key="item.routePath">
      <div :class="['tab_bar_item', { 'is_active': activeIndex === index }]" @click="tabItemClick(item, index)">
        <!-- webpack中动态引入本地图片 -->
        <!-- <img :src="require(item.imgPath)" alt=""> -->
        <!-- vite中动态引入本地图片 -->
        <img :src="getAssetURL(activeIndex === index ? item.imgActivePath : item.imgPath)" alt="">
        <span>{{ item.title }}</span>
      </div>
    </template>
  </div>
</template>

<script setup>
import router from '@/router';
import { ref } from 'vue'

import { tabbarItems } from '@/assets/data/tabbar'
import { getAssetURL } from '@/utils/load_asset'

const activeIndex = ref(0)
const tabItemClick = (item, index) => {
  router.push(item.routePath)
  activeIndex.value = index
}

</script>

<style lang="less" scoped>
.tab_bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;

  border-top: 1px solid #f3f3f3;

  .tab_bar_item {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &.is_active {
      color: var(--primary-color);
    }

    img {
      width: 36px;
    }

    span {
      font-size: 12px;
      margin-top: 2px;
    }
  }
}
</style>