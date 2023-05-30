<template>
  <div class="house_item">
    <div class="inner">{{ houseData.houseName }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  houseData: {
    type: Object,
    default: {}
  }
})
</script>

<style lang="less" scoped>
.house_item {
  width: calc(50vw - 20px);
  height: 150px;
  margin-bottom: 8px;

  border-radius: 5px;
  border: 1px solid #fcc;

  .inner {
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    word-wrap: break-word;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -moz-box;
    -moz-line-clamp: 2;
    -moz-box-orient: vertical;
  }
}
</style>