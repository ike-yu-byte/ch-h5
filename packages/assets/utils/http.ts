import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

const defaultConfig = {
  timeout: 5000,
  baseurl: '',
}
export default class Http {
  constructor(config, memberStore?: Function) {
    this.axiosInstance = axios.create(Object.assign({}, defaultConfig, config))
    this.memberStore = memberStore
    this.httpInterceptorsRequest() // 添加请求拦截器
    this.httpInterceptorsResponse() // 添加响应拦截器
  }
  private memberStore
  private axiosInstance = axios.create(defaultConfig) // 注意是静态属性
  private httpInterceptorsRequest() {
    // 请求拦截器
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        console.log('this.memberStore', this.memberStore)
        return config
      },
      (err) => {
        return Promise.reject(err)
      },
    )
  }
  private httpInterceptorsResponse() {
    // 响应拦截器
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      (err) => {
        return Promise.reject(err)
      },
    )
  }

  public httpRequestGet<T>(
    url: string,
    params: AxiosRequestConfig,
  ): Promise<T> {
    return this.axiosInstance
      .get(url, params)
      .then((res) => res.data)
      .catch((err) => {
        console.log(err)
      })
  }

  public httpRequestPost(url: string, params: AxiosRequestConfig) {
    return this.axiosInstance
      .post(url, params)
      .then((res) => res.data)
      .catch((err) => {
        console.log(err)
      })
  }
}
