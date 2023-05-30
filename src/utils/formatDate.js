import dayjs from "dayjs";

// 获取MM/DD,具体其他使用参考官方文档
export function formatMonthDay(date) {
  return dayjs(date).format('MM月DD日')
}

// 获取间隔天数
export function getDiffDays(startDate, endDate) {
  return dayjs(endDate).diff(startDate, 'day')
}