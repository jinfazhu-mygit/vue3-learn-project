<template>
  <div class="app">
    <!-- <keep-alive includes="home">
      <router-view />
    </keep-alive> -->
    <router-view v-slot="{ Component }">
      <keep-alive include="home">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <Tabbar v-show="!route.meta.hideTabbar"></Tabbar>
    <loading></loading>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Tabbar from '@/components/tabbar/index.vue'
import loading from '@/components/loading/index.vue'

const route = useRoute()

</script>

<style lang="less" scoped>
.app {
  height: 100vh;
}
</style>