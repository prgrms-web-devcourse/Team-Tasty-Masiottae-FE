import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { getLocalToken } from './useLocalToken'

export const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  console.info(`[request] [${JSON.stringify(config)}]`)
  const token = getLocalToken()
  if (!config?.headers) {
    throw new Error(`Axios config headers must be provided`)
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

export const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${JSON.stringify(error)}]`)
  return Promise.reject(error)
}

export const onResponse = (response: AxiosResponse): AxiosResponse => {
  console.info(`[response] [${JSON.stringify(response)}]`)
  return response
}

export const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[response error] [${JSON.stringify(error)}]`)
  return Promise.reject(error)
}
