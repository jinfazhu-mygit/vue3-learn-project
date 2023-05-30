import request from "../request";

export function getHotSuggest() {
  return request.get({
    url: '/home/hotSuggests'
  })
}

export function getCategories() {
  return request.get({
    url: '/home/categories'
  })
}

export function getContentList(page = 1) {
  return request.get({
    url: '/home/houselist',
    params: {
      page
    }
  })
}