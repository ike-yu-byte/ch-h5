import { useClipboard } from '@vueuse/core'
import { ElMessage } from 'element-plus'

// 注意：粘贴板由于浏览器安全限制，只有在https协议或者localhost下才能复制成功
const { copy, isSupported } = useClipboard()

export const useCopy = async (str: string) => {
  const $t = (window as any).$t
  if (!navigator.clipboard) {
    // 兼容http协议
    const input = document.createElement('input')
    input.setAttribute('value', str)
    document.body.appendChild(input)
    input.select()
    const flag = document.execCommand('copy')
    document.body.removeChild(input)
    if (flag) {
      ElMessage({
        type: 'success',
        message: $t('复制成功'),
      })
    } else {
      ElMessage({
        type: 'error',
        message: $t('复制失败'),
      })
    }
  } else {
    try {
      await copy(str)
      if (!isSupported.value) {
        throw new Error()
      }
      ElMessage({
        type: 'success',
        message: $t('复制成功'),
      })
    } catch (err: any) {
      console.log('err', err)
      ElMessage({
        type: 'error',
        message: $t('复制失败'),
      })
    }
  }
}
