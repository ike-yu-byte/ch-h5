export const subApps = [
  // 目前仅用于测试wujie微应用
  {
    name: 'home',
    url: 'http://192.168.0.101:5001/index',
    activeRule: '/home',
  },
  {
    name: 'feedback',
    url: 'http://192.168.0.101:5001/feedback',
    activeRule: '/feedback',
  },
]

export const langList = [
  {
    label: 'English', // 英语
    value: 'en',
  },
  {
    label: '日本語', // 日语
    value: 'ja',
  },
  {
    label: '中文繁體', // 中文繁体
    value: 'zhHK',
  },
  {
    label: '한국어', // 韩语
    value: 'ko',
  },
  {
    label: 'ภาษาไทย', // 泰语
    value: 'th',
  },
  {
    label: 'Español', // 西班牙语
    value: 'es',
  },
  {
    label: 'Spanyol', // 印尼语
    value: 'id',
  },
  {
    label: 'Tiếng Việt', // 越南语
    value: 'vi',
  },
  {
    label: 'Italiano', // 意大利语
    value: 'it',
  },
  {
    label: 'Русский язык', // 俄语
    value: 'ru',
  },
  {
    label: 'Deutsch', // 德语
    value: 'de',
  },
]

export const langMap: any = {
  // 后端接口对应语言传参
  // 'en': LangEn, // 英语 // en
  // 	'zh': LangChs, // 繁体中文 zh
  // 	'hk': LangHk, // 香港中文 zhCN
  // 	'jp': LangJp, // 日本 ja
  // 	'th': LangTh, // 泰国 th
  //     'kr': LangKr, // 韩国 // ko
  // 	'hi': LangHi, // 印地语 // hi
  // 	'sp': LangSp, // 西班牙语 // sp
  en: 'en',
  zh: 'zh',
  zhHK: 'hk',
  ja: 'jp',
  th: 'th',
  ko: 'kr',
  hi: 'hi',
  sp: 'sp',
}

export const supportEmail = 'support@debit.com'

export const businessEmail = 'business@debit.com'

export const copyRight = 'Copyright © 2025 Debit Limited. All rights reserved.'

export const baseURL =
  import.meta.env.MODE === 'development'
    ? '/api/'
    : import.meta.env.VITE_BASE_URL || 'http://47.116.15.102:1688/api/'

// 静态资源路径前缀
export const static_url =
  import.meta.env.VITE_STATIC_URL || 'http://47.116.15.102:1688/'
