import _debounce from "@/utils/debounce"
import _throttle from "@/utils/throttle"
import { onMounted, onUnmounted, onActivated, onDeactivated, ref } from "vue"

// 回调函数的方式
// export default function useScroll(targetRef, reachBottomCB) {
//   // 默认对window进行滚动监听
//   let el = window
//   onMounted(() => {
//     // 是window还是某个结点，根据实际情况而定
//     if (targetRef) el = targetRef.value
//     el.addEventListener('scroll', scrollHandler)
//   })
//   onUnmounted(() => {
//     el.removeEventListener('scroll', scrollHandler)
//   })
//   // 使用了keep-alive动态组件的时候的添加移除监听
//   onActivated(() => {
//     if (targetRef) el = targetRef.value
//     el.addEventListener('scroll', scrollHandler)
//   })
//   onDeactivated(() => {
//     el.removeEventListener('scroll', scrollHandler)
//   })

//   // 滚动监听的回调
//   const scrollHandler = _throttle(() => {
//     let scrollTop
//     let clientHeight
//     let scrollHeight
//     // 使用+1是因为解决浏览器实际高度与js获取到的高度产生误差
//     // 通过节流的方式避免同一时间内多次调用下一页
//     // 也达到了优化界面性能的效果，只有达到底部才触发回调!
//     if (el === window) { // 是window滚动还是某个节点
//       scrollTop = document.documentElement.scrollTop
//       clientHeight = document.documentElement.clientHeight
//       scrollHeight = document.documentElement.scrollHeight
//     } else {
//       scrollTop = el.scrollTop
//       clientHeight = el.clientHeight
//       scrollHeight = el.scrollHeight
//     }
//     // 下行重点!!!
//     console.log('已滚动', scrollTop, '窗口高度', clientHeight, '总高度', scrollHeight)
//     // 触底加载更多
//     if (scrollTop + clientHeight + 1 >= scrollHeight) {
//       // 滚动到底部了，回调
//       console.log('滚动到底部了，回调')
//       if (reachBottomCB) reachBottomCB()
//     }
//   }, 80)
// }

// 返回变量的方式
export default function useScroll(targetRef) {
  // 默认对window进行滚动监听
  let el = window
  onMounted(() => {
    // 是window还是某个结点，根据实际情况而定
    if (targetRef) el = targetRef.value
    el.addEventListener('scroll', scrollHandler)
  })
  onUnmounted(() => {
    el.removeEventListener('scroll', scrollHandler)
  })
  // 使用了keep-alive动态组件的时候的添加移除监听
  onActivated(() => {
    if (targetRef) el = targetRef.value
    el.addEventListener('scroll', scrollHandler)
  })
  onDeactivated(() => {
    el.removeEventListener('scroll', scrollHandler)
  })

  const isReachBottom = ref(false)
  const scrollTop = ref(0)
  const clientHeight = ref(0)
  const scrollHeight = ref(0)
  // 滚动监听的回调
  const scrollHandler = _throttle(() => {
    // 使用+1是因为解决浏览器实际高度与js获取到的高度产生误差
    // 通过节流的方式避免同一时间内多次调用下一页
    // 也达到了优化界面性能的效果，降低触发频率!
    if (el === window) { // 是window滚动还是某个节点
      scrollTop.value = document.documentElement.scrollTop
      clientHeight.value = document.documentElement.clientHeight
      scrollHeight.value = document.documentElement.scrollHeight
    } else {
      scrollTop.value = el.scrollTop
      clientHeight.value = el.clientHeight
      scrollHeight.value = el.scrollHeight
    }
    // 下行重点!!!
    // console.log('已滚动', scrollTop.value, '窗口高度', clientHeight.value, '总高度', scrollHeight.value)
    // 触底加载更多
    if (scrollTop.value + clientHeight.value + 1 >= scrollHeight.value) {
      // 滚动到底部了
      isReachBottom.value = true
    }
  }, 80, { leading: true, trailing: true }, () => { })

  return { isReachBottom, scrollTop, scrollHeight, clientHeight }
}