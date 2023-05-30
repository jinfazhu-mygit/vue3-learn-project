import axios from "axios"
import { BASE_URL, TIME_OUT } from "./config"

import useMainStore from "@/stores/modules/main"
const mainStore = useMainStore()

class JFRequest {
  constructor(baseURL, timeout = 5000) {
    this.instance = axios.create({
      baseURL, // 注意baseURL,timeout写法
      timeout
    })

    this.instance.interceptors.request.use(config => {
      mainStore.isLoading = true
      return config
    }, err => err)
    this.instance.interceptors.response.use(config => {
      mainStore.isLoading = false
      return config
    }, err => {
      mainStore.isLoading = false
      return err
    })
  }

  request(config) {
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  get(config) {
    return this.request({ ...config, methods: 'GET' })
  }

  post(config) {
    return this.request({ ...config, methods: 'POST' })
  }
}

export default new JFRequest(BASE_URL, TIME_OUT)