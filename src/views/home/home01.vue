<template>
  <div class="home">
    <h2>home</h2>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="success">成功按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <van-rate 
      v-model="value" 
      icon="eye" 
      void-icon="eye-o" 
      :size="40" 
      color="#ffd21e"
      allow-half />
      <button @click="value++">评分+1</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const value = ref(3)
</script>

<style lang="less" scoped></style>