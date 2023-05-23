<template>
  <div class="home">
    <home_navbar></home_navbar>
    <div class="home_banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <div class="location">
      <div class="left_location_name">广州</div>
      <div class="right_location_select">
        <span>我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import home_navbar from './cpns/home_navbar.vue';
</script>

<style lang="less" scoped>
.home_banner {
  width: 100%;

  img {
    width: 100%;
  }
}

.location {
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  padding: 0 18px;

  .right_location_select {
    height: 24px;
    span {
      position: relative;
      top: 2.8px;
    }

    img {
      height: 100%;
      margin-left: 6px;
    }
  }
}
</style>