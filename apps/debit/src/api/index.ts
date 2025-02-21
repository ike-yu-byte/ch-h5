import http from '@/utils/request.ts'
// 案例API
export function apiDemo(url: string = '', param: object = {}) {
  return http.httpRequestGet(url, param)
  // post方式这么用
  // http.httpRequestPost(url, param)
}
