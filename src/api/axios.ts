import axiosClient from 'axios'
import type { AxiosRequestConfig } from 'axios'
import AuthService from './auth'

const authService = new AuthService()

const config = {
  baseURL: process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000',
}

const instance = axiosClient.create(config)

const authInterceptor = (config: any) => {
  config.headers.Authorization = `Bearer ${authService.token}`
  config.headers.common.Accept = 'Application/json'
  config.handlers.common['Content-Type'] = 'Application/json charset=utf-8'
  config.headers['Access-Control-Allow-Origin'] = '*'
  return config
}

const loggerInterceptor: any = (config: AxiosRequestConfig) => config

instance.interceptors.request.use(authInterceptor)
instance.interceptors.request.use(loggerInterceptor)

instance.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    // 토큰이 존재하지 않음
    if (error.response.status === 401) {
      authService.logout()
    }

    const errorMessage = error.response.data.message
    error.response.data.message = () => {
      if (errorMessage.length > 200) {
        return JSON.parse(
          errorMessage.split('code :').pop()
        ).error.message.split(':')[0]
      }
      return errorMessage
    }

    throw error
    // Promise.reject(error)
  }
)

const axios = <T>(config: AxiosRequestConfig) =>
  instance.request<any, T>(config)

export default axios
