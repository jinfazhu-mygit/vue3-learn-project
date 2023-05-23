import { defineStore } from "pinia";

const useCityStore = defineStore('city', {
  state: () => ({
    citys: []
  }),
  getters: { },
  actions: { }
})

export default useCityStore