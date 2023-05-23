export const getAssetURL = (path) => {
  // new URL参数一: 文件所在的相对路径
  // new URL参数二: import.meta.url表示当前文件所在的路径
  // 合并起来就是通过new URL根据当前文件所在路径(import.meta.url)去获取资源，再使用.href转成超链接
  return new URL(`../assets/img/tabbar/${path}`, import.meta.url).href
}