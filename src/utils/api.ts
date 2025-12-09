import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import type { ServerResponse, FoodsQueryParams, FoodItem } from '@/request/api.types'

// API基础配置：优先使用环境变量；开发环境走相对路径，配合 devServer 代理以避免 CORS
const env = (typeof process !== 'undefined' && (process as any).env) ? (process as any).env : {}
const isDev = env.NODE_ENV !== 'production'
const API_BASE_URL = isDev
  ? ''
  : (env.API_BASE_URL || 'http://47.114.86.249:3000')

// 参数序列化：将数组序列化为逗号分隔，避免qs依赖
const serializeParams = (params?: Record<string, any>): string => {
  const usp = new URLSearchParams()
  if (!params) return usp.toString()
  Object.keys(params).forEach((key) => {
    const value = (params as any)[key]
    if (value === undefined || value === null) return
    if (Array.isArray(value)) {
      // 后端按逗号分割解析
      usp.append(key, value.join(','))
    } else {
      usp.append(key, String(value))
    }
  })
  return usp.toString()
}

// 创建axios实例
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10秒超时
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  // 统一数组序列化策略
  paramsSerializer: {
    serialize: serializeParams,
  },
})

// 请求拦截器
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 可在此添加鉴权信息（示例：从localStorage读取token）
    const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : undefined
    if (token) {
      // 兼容 AxiosHeaders 实例与普通对象的写法，避免直接整体赋值导致类型不匹配
      const headers: any = config.headers || {}
      if (typeof headers.set === 'function') {
        headers.set('Authorization', `Bearer ${token}`)
      } else {
        headers['Authorization'] = `Bearer ${token}`
      }
      config.headers = headers
    }
    // 统一日志
    console.log('发送请求:', config.method?.toUpperCase(), config.baseURL + (config.url || ''))
    return config
  },
  (error) => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('收到响应:', response.status, response.config.url)
    return response
  },
  (error) => {
    console.error('响应错误:', error.response?.status, error.message)
    // 统一错误处理
    if (error.response) {
      const { status, data } = error.response
      const msg = (data && (data.message || data.msg)) || error.message
      switch (status) {
        case 400:
          console.error('请求参数错误:', msg)
          break
        case 401:
          console.error('未授权访问')
          break
        case 403:
          console.error('禁止访问')
          break
        case 404:
          console.error('资源不存在')
          break
        case 500:
          console.error('服务器内部错误')
          break
        default:
          console.error('请求失败:', msg)
      }
    } else if (error.request) {
      console.error('网络连接失败，请检查网络设置')
    } else {
      console.error('请求配置错误:', error.message)
    }
    return Promise.reject(error)
  }
)

// API接口函数
export const api = {
  // 健康检查接口
  health: () => apiClient.get('/api/health'),
  // 菜品/食物接口（按食材组合查询）
  foods: (params?: FoodsQueryParams) =>
    apiClient.get<ServerResponse<FoodItem[]>>('/api/foods', { params }),

  // GET请求
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.get(url, config),

  // POST请求
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.post(url, data, config),

  // PUT请求
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.put(url, data, config),

  // DELETE请求
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.delete(url, config),
}

export default api
