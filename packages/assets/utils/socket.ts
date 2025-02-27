export function debounce(func, wait = 300, immediate = false) {
  let timeoutId = null

  // 返回防抖处理后的函数
  return function (...args) {
    const context = this // 保存正确的this上下文

    // 清理之前的定时器
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    // 立即执行模式
    if (immediate) {
      // 如果尚未执行过，立即调用并标记为已执行
      const callNow = !timeoutId
      timeoutId = setTimeout(() => {
        timeoutId = null // 恢复可执行状态
      }, wait)
      if (callNow) {
        func.apply(context, args)
      }
    }
    // 非立即执行模式(默认)
    else {
      timeoutId = setTimeout(() => {
        func.apply(context, args)
      }, wait)
    }
  }
}

let socket = null
export const useSocket = debounce(() => {
  const testaddr = 'wss://echo.websocket.org'
  socket = new WebSocket(testaddr)

  // 2. 连接成功回调
  socket.addEventListener('open', (event) => {
    console.log('连接已建立', event)
    socket.send(
      JSON.stringify({
        type: 'auth',
        token: 'user_token_123',
      }),
    )
  })

  // 3. 接收消息处理
  socket.addEventListener('message', (event) => {
    let data
    try {
      data = JSON.parse(event.data)
    } catch {
      data = event.data
    }
    console.log('收到消息:', data)
  })

  // 4. 错误处理
  socket.addEventListener('error', (error) => {
    console.error('连接错误:', error)
  })

  // 5. 关闭连接处理
  socket.addEventListener('close', (event) => {
    console.log('连接关闭:', event.code, event.reason)
  })
})

export const closeSocket = debounce(() => {
  if (socket.readyState === WebSocket.OPEN) {
    // 使用标准code1000关闭
    socket.close(1000, '用户主动断开连接')
  }
})
