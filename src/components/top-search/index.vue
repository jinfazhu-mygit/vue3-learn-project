<template>
  <div class="top_search">
    <div class="search">
      <div class="left">
        <div class="left_content">
          <div class="left_top">
            <span>住 </span>
            <span>{{ startDate }}</span>
          </div>
          <div class="left_bottom">
            <span>离 </span>
            <span>{{ leaveDate }}</span>
          </div>
        </div>
      </div>
      <div class="right">
        <van-search v-model="value" placeholder="请输入搜索关键词" left-icon="" right-icon="search" />
      </div>
    </div>
  </div>
</template>

<script setup>
import useMainStore from '@/stores/modules/main';
import { storeToRefs } from 'pinia';
const mainStore = useMainStore()
const { startDate, leaveDate } = storeToRefs(mainStore)
</script>

<style lang="less" scoped>
.top_search {
  position: absolute;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: #fff;
  
  .search {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e8e8e8;

    .left {
      width: 20%;
      height: 100%;
      padding: 10px 0px 10px 8px;
      .left_content {
        height: 34px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: #f7f8fa;
        .left_top {}
  
        .left_bottom {}
      }

    }

    .right {
      width: calc(80% - 4px);

      .van-search {
        padding-left: 4px;
      }
    }
  }
}
</style>