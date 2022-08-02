import axios from 'axios'
import {
  handleRequest,
  handleRequestError,
  handleResponse,
  handleResponseError
} from './interceptors'

const axiosInstance = axios.create({
  timeout: 5000,
  baseURL: '/',
  headers: {
    'Content-Type': `application/json`
  }
})

axiosInstance.interceptors.request.use(handleRequest, handleRequestError)
axiosInstance.interceptors.response.use(handleResponse, handleResponseError)

export default axiosInstance
