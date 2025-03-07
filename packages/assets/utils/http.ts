import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'

const defaultConfig = {
  timeout: 5000,
  baseurl: '',
}
export default class Http {
  constructor(
    config,
    memberStore?: Function,
    $t?: Function,
    $ElMessage?: Function,
  ) {
    this.axiosInstance = axios.create(Object.assign({}, defaultConfig, config))
    this.memberStore = memberStore?.()
    this.$t = $t
    this.$ElMessage = $ElMessage
    this.httpInterceptorsRequest() // 添加请求拦截器
    this.httpInterceptorsResponse() // 添加响应拦截器
  }
  private $ElMessage
  private $t
  private memberStore
  private axiosInstance = axios.create(defaultConfig) // 注意是静态属性
  private httpInterceptorsRequest() {
    // 请求拦截器
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        config.headers.Authorization = localStorage.getItem('token') || ''
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
        if (response.status >= 200 && response.status < 300) {
          // 响应成功
          if (!response.data.code) {
            return Promise.reject(this.$t('网络错误，换个网络试试'))
          } else {
            return response
          }
        } else if (response.status === 401) {
          // 登录失效，清理用户信息等操作在pinia里面的clearProfile里面操作
          this.memberStore?.handleLoginExpired?.()
        } else {
          return Promise.reject(this.$t('网络错误，换个网络试试'))
        }
      },
      (err) => {
        return Promise.reject(err)
      },
    )
  }

  private handleError(err: string) {
    console.log('出错', err)
    this.$ElMessage({
      type: 'error',
      message: err,
    })
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance
      .get(url, config || {})
      .then((res) => res.data)
      .catch((err) => {
        this.handleError(err)
      })
  }

  public post(url: string, params: Object = {}, config?: AxiosRequestConfig) {
    return this.axiosInstance
      .post(url, params, config)
      .then((res) => res.data)
      .catch((err) => {
        this.handleError(err)
      })
  }
}
