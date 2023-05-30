import { defineStore } from "pinia";

const useMainStore = defineStore('main', {
  state: () => ({
    startDate: '',
    leaveDate: '',

    isLoading: false
  }),
  actions: {
  }
})

export default useMainStore