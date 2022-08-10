import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { getLocalToken } from '@utils/localToken'

export const handleRequest = (
  config: AxiosRequestConfig
): AxiosRequestConfig => {
  const token = getLocalToken()
  if (!config?.headers) {
    throw new Error(`Axios config headers must be provided`)
  }

  if (token) {
    config.headers.Authorization = token
  }

  return config
}

export const handleRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${JSON.stringify(error)}]`)
  return Promise.reject(error)
}

export const handleResponse = (response: AxiosResponse): AxiosResponse => {
  return response
}

export const handleResponseError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[response error] [${JSON.stringify(error)}]`)
  return Promise.reject(error)
}
