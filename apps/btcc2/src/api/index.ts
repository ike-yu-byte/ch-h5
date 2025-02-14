import http from "@/utils/request.ts";
export function apiDemo(url: string = "", param: object = {}) {
  return http.httpRequestGet(url, param);
}
