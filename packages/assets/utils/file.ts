export function handleChooseFile(options = {}, callback) {
  // 合并默认配置和用户配置
  const config = {
    multiple: false,
    accept: '*/*', // 默认接受所有文件类型
    maxSize: 1024 * 1024 * 10, // 默认10MB
    ...options,
  }

  // 创建隐藏的input元素
  const input = document.createElement('input')
  input.type = 'file'
  input.style.display = 'none'

  // 设置配置属性
  input.multiple = config.multiple
  input.accept = config.accept

  // 监听文件选择事件
  input.addEventListener('change', (event: any) => {
    const files = Array.from(event.target.files)
    const validFiles = []

    // 验证每个文件
    files.forEach((file: any) => {
      if (file.size > config.maxSize) {
        alert(
          `文件 ${file.name} 超过大小限制 (最大 ${config.maxSize / 1024 / 1024}MB)`,
        )
        return
      }
      validFiles.push(file)
    })

    // 如果有有效文件则执行回调
    if (validFiles.length > 0) {
      callback(validFiles)
    }

    // 清理DOM
    document.body.removeChild(input)
  })

  // 触发文件选择窗口
  document.body.appendChild(input)
  input.click()
}
