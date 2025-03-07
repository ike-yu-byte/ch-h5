import http from '@/utils/request.ts'
import { static_url, langMap } from '@/config'

function formatData(obj: any) {
  const lang: any = localStorage.getItem('locale') || 'en'
  if (lang) {
    obj.lang = langMap[lang]
  }
  obj.token = localStorage.getItem('token') || ''
  return obj
}

//获取图片地址
export const getImageUrl = (image: string) => {
  const protocal = ['http', 'https']
  if (!image) return ''
  if (image && protocal.find((item) => image.includes(item))) {
    return image
  } else {
    return static_url + image
  }
}

// 案例API
export function apiDemo(param: object = {}) {
  return http.get('', { params: formatData(param), responseType: 'json' })
}

// 货币市场行情
export const getCurrencyMarket = (data: object = {}) => {
  return http.post('currency/quotation_new', formatData(data), {
    responseType: 'json',
  })
}
