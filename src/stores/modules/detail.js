import { getHouseDetail } from "@/service/modules/detail";
import { defineStore } from "pinia";

const useDetailStore = defineStore('houseDetail', {
  state: () => ({
    detailInfo: {}
  }),
  actions: {
    fetchHouseDetail(id) {
      getHouseDetail(id).then((res) => {
        // console.log(res.data.data)
        this.detailInfo = res.data.data
      })
    }
  }
})

export default useDetailStore