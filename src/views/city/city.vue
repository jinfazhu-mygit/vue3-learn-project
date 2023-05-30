<template>
  <div class="city_page hide_tabbar">
    <div class="top">
        <!-- 搜索框 -->
      <van-search
        v-model="searchValue"
        placeholder="城市/区域/位置"
        shape="round"
        show-action
        @cancel="cancleClick"
      />
      <!-- tab的切换 -->
      <van-tabs v-model:active="tabActive">
        <!-- 对象的遍历value, key, index -->
        <template v-for="(item, key, index) in allCitys">
          <van-tab :title="item.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <!-- <city_group :group-data="curGroup?.cities" /> -->
      <!-- v-show渲染优化 -->
      <template v-for="(item, key, index) in allCitys" :key="key">
        <city_group v-show="tabActive === key" :group-data="item" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import router from '@/router';

import useCityStore from '@/stores/modules/city'
import { getAllCitys } from '@/service/modules/city';
import { storeToRefs } from 'pinia';

import city_group from './cpns/city_group.vue'

const searchValue = ref('')
const cancleClick = () => {
  router.back()
}

const tabActive = ref('')

// 网络请求：获取城市数据
// const cityData = ref({})
// getAllCitys().then((res) => {
//   cityData.value = res.data.data
// })

// 使用store里的数据
const cityStore = useCityStore()
cityStore.fetchCityAll()
const { allCitys } = storeToRefs(cityStore)

// 获取选中tab对应的数据
// 1.获取key
// 2.保证对象数据的响应式
// const curGroup = computed(() => allCitys.value[Object.keys(allCitys.value)[tabActive.value]])
// console.log(curGroup)

</script>

<style lang="less" scoped>
.city_page {
  .top {
    position: relative;
    z-index: 9;
  }
  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}
</style>