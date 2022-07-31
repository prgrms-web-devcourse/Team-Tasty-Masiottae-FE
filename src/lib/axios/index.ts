import axios from 'axios'
import {
  onRequest,
  onRequestError,
  onResponse,
  onResponseError
} from './interceptors'

const axiosInstance = axios.create({
  timeout: 5000,
  baseURL: process.env.REACT_APP_API_URL
})

axiosInstance.interceptors.request.use(onRequest, onRequestError)

axiosInstance.interceptors.response.use(onResponse, onResponseError)

export default axiosInstance
