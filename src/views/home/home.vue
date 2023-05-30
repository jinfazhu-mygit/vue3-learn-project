<template>
  <div class="home" ref="homeRef">
    <home_navbar></home_navbar>
    <div class="home_banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <home_search_box></home_search_box>
    <home_categories></home_categories>
    <topSearch v-show="showSearchTop"></topSearch>
    <home_content_list></home_content_list>
    <!-- <button @click="getNextPage">获取下一页数据</button> -->
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, onActivated, onDeactivated } from 'vue';

import home_navbar from './cpns/home_navbar.vue';
import home_search_box from './cpns/home_search_box.vue';
import home_categories from './cpns/home_categories.vue';
import home_content_list from './cpns/home_content_list.vue';
import topSearch from '@/components/top-search/index.vue'

import { useHomeStore } from '@/stores/modules/home'

import _debounce from '@/utils/debounce'
import useScroll from '@/hooks/useScroll'

// 请求热门数据、分类数据
const homeStore = useHomeStore()
homeStore.getHot()
homeStore.getCategory()
homeStore.fetchContentList()

// const getNextPage = () => {
//   homeStore.fetchContentList()
// }

// onMounted(() => {
//   // 是window还是某个结点，根据实际情况而定
//   // window.addEventListener('scroll', scrollHandler)
//   homeRef.value.addEventListener('scroll', scrollHandler)
// })
// onUnmounted(() => {
//   // window.removeEventListener('scroll', scrollHandler)
//   homeRef.value.removeEventListener('scroll', scrollHandler)
// })
// // 使用了keep-alive动态组件的时候的添加移除监听
// onActivated(() => {
//   homeRef.value.addEventListener('scroll', scrollHandler)
// })
// onDeactivated(() => {
//   homeRef.value.addEventListener('scroll', scrollHandler)
// })

// // 滚动监听的回调
// const scrollHandler = _debounce(() => {
//   // 使用+1是因为解决浏览器实际高度与js获取到的高度产生误差
//   // 通过防抖的方式避免同一时间内多次调用下一页
//   // 也达到了优化界面性能的效果，只有达到底部才触发回调!
//   const scrollTop = homeRef.value.scrollTop // document.documentElement.scrollTop
//   const clientHeight = homeRef.value.clientHeight // document.documentElement.clientHeight
//   const scrollHeight = homeRef.value.scrollHeight // document.documentElement.scrollHeight
//   console.log('已滚动', scrollTop, '窗口高度', clientHeight, '总高度', scrollHeight)
//   // 触底加载更多
//   if (scrollTop + clientHeight + 1 >= scrollHeight) {
//     getNextPage()
//   }
// }, 80)

// setup里传不了ref.value实际节点
// useScroll(homeRef, () => {
  //   getNextPage()
  // })
  
// 监听home页面滚动
const homeRef = ref()
// 触底变量获取的方式
const { isReachBottom, scrollTop } = useScroll(homeRef)
watch(isReachBottom, (newValue) => {
  if(newValue) {
    // 获取下一页数据
    homeStore.fetchContentList().then(() => {
      isReachBottom.value = false
    })
  }
})
// 动态显示顶部搜索栏
const showSearchTop = ref(false)
watch(scrollTop, (newValue) => {
  showSearchTop.value = newValue > 350
})

// 跳转回home页面后滚动高度回到原来位置
onActivated(() => {
  homeRef.value.scrollTo({
    top: scrollTop.value
  })
})

</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: calc(100% - 50px);
  overflow-y: auto;
}

.home_banner {
  width: 100%;

  img {
    width: 100%;
  }
}
</style>