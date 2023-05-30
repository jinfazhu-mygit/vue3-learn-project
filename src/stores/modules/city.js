import { getAllCitys } from '@/service/modules/city'
import { defineStore } from 'pinia'

const useCityStore = defineStore('city', {
  state: () => ({
    allCitys: {},

    curCity: {
      cityName: '南昌'
    }
  }),
  actions: {
    async fetchCityAll() {
      const res = await getAllCitys()
      this.allCitys = res.data.data
    }
  }
})

export default useCityStore