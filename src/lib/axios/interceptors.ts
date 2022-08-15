import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { checkToken } from '@utils/checkToken'

export const handleRequest = async (config: AxiosRequestConfig) => {
  return checkToken(config)
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
