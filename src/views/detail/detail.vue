<template>
  <div class="detail hide_tabbar">
    <van-nav-bar
      title="房屋详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class=""></div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import useDetailStore from '@/stores/modules/detail'
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const route = useRoute()
const router = useRouter()
console.log(route.params.id)

const onClickLeft = () => {
  router.back()
}

const detailStore = useDetailStore()
detailStore.fetchHouseDetail(route.params.id)
const { detailInfo } = storeToRefs(detailStore)
console.log(detailInfo)
const mainPart = computed(() => detailInfo.value.mainPart)
console.log(mainPart)
</script>

<style lang="less" scoped>
.detail {
  :deep(.van-nav-bar__text) {
    color: var(--primary-color);
  }
}
</style>