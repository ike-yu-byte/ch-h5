/**
 * 存储带过期时间的数据
 * @param {string} key 存储键
 * @param {any} value 存储值
 * @param {number} maxAge 有效期（秒）
 */

// 设置缓存过期时间（注意：设置了过期时间，读取也只能用这里的方法读取）
export function setItem(
  key: string,
  value: string,
  maxAge: number = 24 * 60 * 60,
) {
  const now = Date.now()
  const item = {
    value,
    __expiry__: now + maxAge * 1000, // 转换为毫秒
  }
  localStorage.setItem(key, JSON.stringify(item))
}

/**
 * 获取带过期时间的数据
 * @param {string} key 存储键
 * @returns {any|null} 未过期返回数据，过期返回 null
 */
export function getItem(key: string) {
  const raw = localStorage.getItem(key)
  if (!raw) return null

  try {
    const item = JSON.parse(raw)
    if (Date.now() > item.__expiry__) {
      localStorage.removeItem(key)
      return null
    }
    return item.value
  } catch (e) {
    console.error('数据解析失败:', e)
    return null
  }
}

/**
 * 初始化时清理所有过期数据（建议页面加载时调用）
 */
export function clearExpired() {
  Object.keys(localStorage).forEach((key) => {
    const raw = localStorage.getItem(key)
    try {
      const item = JSON.parse(raw)
      if (item?.__expiry__ && Date.now() > item.__expiry__) {
        localStorage.removeItem(key)
      }
    } catch {
      // 非过期数据格式，跳过处理
    }
  })
}
