<template>
  <div class="content">
    <div class="title">热门精选</div>
    <div class="list">
      <template v-for="item in contentList" :key="item.data.houseId">
        <houseItem :houseData="item.data" @click="houseItemClick(item.data.houseId)"></houseItem>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useHomeStore } from '@/stores/modules/home';
import { storeToRefs } from 'pinia';
import houseItem from '@/components/house-item/index.vue'
import { useRouter } from 'vue-router';

const homeStore = useHomeStore()
const { contentList } = storeToRefs(homeStore)

const router = useRouter()
const houseItemClick = (id) => {
  router.push('/detail/' + id)
}
</script>

<style lang="less" scoped>
.content {
  padding-left: 16px;
  padding-right: 12px;

  .title {
    font-size: 20px;
    color: #000;
    font-weight: 700;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>