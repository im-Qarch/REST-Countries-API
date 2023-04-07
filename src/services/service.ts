import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosInterceptorManager,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: 'https://restcountries.com/v3.1', // set base url if needed :)
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000, // request timeout
}) as AxiosInstance

// request interceptor
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // do something before request is sent
    config.headers = config.headers ?? { 'Content-Type': 'application/json' }
    return config ?? {}
  },
  (error: AxiosError) => {
    // do when request error
    return Promise.reject(error)
  },
) as unknown as AxiosInterceptorManager<AxiosRequestConfig>

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * ! return  response => response
   */
  (response: AxiosResponse) => {
    return response?.data
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
) as unknown as AxiosInterceptorManager<AxiosResponse>

export default service
