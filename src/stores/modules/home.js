import { getCategories, getContentList, getHotSuggest } from '@/service'
import { defineStore } from 'pinia'

const useHomeStore = defineStore('home', {
  state: () => ({
    hotSuggest: [],
    categories: [],

    currentPage: 1,
    contentList: []
  }),
  actions: {
    getHot() {
      getHotSuggest().then((res) => {
        // console.log('suggests', res.data.data)
        this.hotSuggest = res.data.data
      })
    },
    getCategory() {
      getCategories().then((res) => {
        // console.log('category', res.data.data)
        this.categories = res.data.data
      })
    },
    async fetchContentList() {
      const res = await getContentList(this.currentPage)
      // console.log('contentList', res.data.data)
      this.contentList.push(...res.data.data)
      this.currentPage++
    }
  }
})

export { useHomeStore }