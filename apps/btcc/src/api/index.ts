import http from "@/utils/request.ts";
export function apiDemo(url: string = "", param: object = {}) {
  console.log("http", http);
  return http.httpRequestGet(url, param);
}
