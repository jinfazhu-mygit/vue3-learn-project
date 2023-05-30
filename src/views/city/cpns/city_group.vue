<template>
  <div class="city_group">
    <h5>热门</h5>
    <div class="hot_cities">
      <template v-for="item in groupData.hotCities">
        <div @click="cityClick(item)" class="hot_city_item">{{ item.cityName }}</div>
      </template>
    </div>

    <van-index-bar :sticky="false" :index-list="groups">
      <template v-for="(item, index) in groupData.cities" :key="index">
        <van-index-anchor :index="item.group" />
        <template v-for="(iten, indey) in item.cities" :key="indey">
          <van-cell @click="cityClick(iten)" :title="iten.cityName"></van-cell>
        </template>
      </template>
    </van-index-bar>

    <!-- <template v-for="(item, index) in groupData">
      <h3>{{ item.group }}</h3>
      <template v-for="(iten, indey) in item.cities">
        <div class="group_list">{{ iten.cityName }}</div>
      </template>
    </template> -->
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import useCityStore from '@/stores/modules/city';
import { computed } from 'vue'

const props = defineProps({
  groupData: {
    type: Object,
    default: () => ({}),
    required: false
  }
})

const groups = computed(() => {
  return props.groupData.cities.map(item => item.group)
})

// 城市点击
const cityStore = useCityStore()
const router = useRouter()
const cityClick = (city) => {
  cityStore.curCity = city

  router.back()
}

</script>

<style lang="less" scoped>
.city_group {
  h5 {
    margin: 10px;
  }
  .hot_cities {
    display: flex;
    justify-content: left;
    flex-wrap: wrap;

    &::after {

    }

    .hot_city_item {
      width: calc(25vw - 22.5px);
      height: 28px;
      box-sizing: border-box;
      line-height: 28px;
      text-align: center;
      border-radius: 14px;
      font-size: 12px;
      color: #000;
      margin: 4px 9px;
      background-color: var(--primary-color);
    }
  }

}
</style>