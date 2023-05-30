<template>
  <div class="home_search_box">
    <!-- 位置信息 -->
    <div class="location">
      <div class="left_location_name" @click="cityClick">{{ curCity.cityName }}</div>
      <div class="right_location_select" @click="positionClick">
        <span>我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="">
      </div>
    </div>
    <!-- 日期范围 -->
    <div class="date_range" @click="showCalendar = true">
      <div class="start">
        <span>入住</span>
        <span>{{ startDate }}</span>
      </div>
      <div class="stay">
        <span>共{{ rangeDate }}晚</span>
      </div>
      <div class="end">
        <span>离店</span>
        <span>{{ endDate }}</span>
      </div>
    </div>
    <van-calendar v-model:show="showCalendar" type="range" :round="false" color="#ff9854" @confirm="onConfirmDate" />
    <!-- 热门地区 -->
    <div class="hot_areas">
      <template v-for="item in hotSuggest">
        <div class="hot_area_item" :style="{ color: item.tagText.color, backgroundColor: item.tagText.background.color }">{{ item.tagText.text }}</div>
      </template>
    </div>
    <!-- 搜索按钮 -->
    <div class="search_btn">
      <div class="btn">开始搜索</div>
    </div>
  </div>
</template>

<script setup>
import useCityStore from '@/stores/modules/city';
import useMainStore from '@/stores/modules/main';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'

import { formatMonthDay, getDiffDays } from '@/utils/formatDate'
import { useHomeStore } from '@/stores/modules/home';
import dayjs from 'dayjs';

// 定位相关
function positionClick() {
  console.log('position点击')
  navigator.geolocation.getCurrentPosition(res => {
    console.log(res)
  }, err => {
    console.log(err)
  }, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  })
}
// 城市相关
const router = useRouter()
function cityClick() {
  router.push('/city')
}
const cityStore = useCityStore()
const { curCity } = storeToRefs(cityStore)

// 日期初始化以及使用
const nowDate = new Date()
const newDate = new Date()
newDate.setDate(nowDate.getDate() + 1)
const startDate = ref(formatMonthDay(nowDate))
const endDate = ref(formatMonthDay(newDate))
const rangeDate = ref(getDiffDays(nowDate, newDate))

const showCalendar = ref(false)
const onConfirmDate = (date) => {
  const selectStartDate = formatMonthDay(date[0])
  const selectEndDate = formatMonthDay(date[1])
  startDate.value = selectStartDate
  endDate.value = selectEndDate
  rangeDate.value = getDiffDays(date[0], date[1])
  // 关闭弹窗
  showCalendar.value = false
}

// 更新最新的入住离去日期
const mainStore = useMainStore()
watch([startDate, endDate], (newValue) => {
  // console.log(newValue)
  mainStore.startDate = newValue[0].split('月')[0] + '/' + newValue[0].split('月')[1].split('日')[0]
  mainStore.leaveDate = newValue[1].split('月')[0] + '/' + newValue[1].split('月')[1].split('日')[0]
}, { immediate: true })

// 获取热门地区
const homeStore = useHomeStore()
const { hotSuggest } = storeToRefs(homeStore)

</script>

<style lang="less" scoped>
.home_search_box {
  --van-calendar-popup-height: 100%;
  overflow: hidden; // 解决margin重叠
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
      font-size: 14px;
      top: 3.5px;
    }

    img {
      height: 100%;
      margin-left: 6px;
    }
  }
}

.date_range {
  display: flex;
  justify-content: space-between;
  padding: 0px 18px;

  .start>:nth-child(1),
  .end>:nth-child(1) {
    font-size: 14px;
    color: #a7a6a6;
  }

  span {
    display: block;
    height: 24px;
    line-height: 24px;
  }

  .stay {
    span {
      height: 48px;
      line-height: 48px;
      font-size: 14px;
    }
  }
}

.hot_areas {
  display: flex;
  flex-wrap: wrap;
  padding: 0px 14px;
  .hot_area_item {
    height: 22px;
    margin: 2px 4px;
    padding: 2px 8px;
    line-height: 18px;
    box-sizing: border-box;
    font-size: 12px;
    border-radius: 11px;
  }
}
.search_btn {
  width: 100vw;
  padding: 0px 16px;
  margin-top: 12px;
  margin-bottom: 8px;
  box-sizing: border-box;
  .btn {
    width: 100%;
    height: 40px;
    color: #fff;
    line-height: 40px;
    text-align: center;
    background-image: linear-gradient(90deg, #fa8c1d, #fcaf3f);
    border-radius: 20px;
    &:active {
      background-image: linear-gradient(90deg, #ff962c, #ffb84e);
    }
  }
}
</style>