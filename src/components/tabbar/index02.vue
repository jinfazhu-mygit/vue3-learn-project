<template>
  <div class="tab_bar">
    <!-- <template v-for="(item, index) in tabbarItems" :key="item.routePath">
      <div :class="['tab_bar_item', { 'is_active': activeIndex === index }]" @click="tabItemClick(item, index)"> -->
    <!-- webpack中动态引入本地图片 -->
    <!-- <img :src="require(item.imgPath)" alt=""> -->
    <!-- vite中动态引入本地图片 -->
    <!-- <img :src="getAssetURL(activeIndex === index ? item.imgActivePath : item.imgPath)" alt="">
        <span>{{ item.title }}</span>
      </div>
    </template> -->
    <van-tabbar v-model="activeIndex" active-color="#ff9854">
      <template v-for="(item, index) in tabbarItems">
        <van-tabbar-item icon="home-o" :to="item.routePath">
          <span>{{ item.title }}</span>
          <!-- <template #icon>
            <img :src="getAssetURL(activeIndex === index ? item.imgActivePath : item.imgPath)" />
          </template> -->
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { tabbarItems } from '@/assets/data/tabbar'
import { getAssetURL } from '@/utils/load_asset'

const activeIndex = ref(0)

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

  img {
    height: 28px;
  }

  // 样式穿透1：直接找到相应的变量位置在作用域下修改
  // --van-tabbar-item-icon-size: 28px;
  
  
  // 样式穿透2：:deep(子元素选择器)
  :deep(.van-tabbar-item__icon) {
    font-size: 28px;
  }
}
</style>