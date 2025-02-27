import dayjs from 'dayjs'
// 深拷贝
export function cloneDeep(obj, hash = new WeakMap()) {
  // number、symbol、boolean、string、undefined、null、function在这直接返回
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  if (obj instanceof Date) {
    return new Date(obj)
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj)
  }

  if (hash.get(obj)) {
    return hash.get(obj)
  }

  // 根据当前对象的类型创建一个空数组或者空对象
  let cloneObj = new obj.constructor()
  hash.set(obj, cloneObj)
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = cloneDeep(obj[key], hash)
    }
  }
  return cloneObj
}

// 格式化数据
export const format = (time: any, str: string = 'YYYY-MM-DD hh:mm:ss A') => {
  return dayjs(time).format(str)
}

export * from './socket'
