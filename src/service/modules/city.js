import request from "../request";

export function getAllCitys() {
  return request.get({
    url: '/city/all'
  })
}