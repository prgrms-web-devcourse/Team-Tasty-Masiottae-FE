import axios from 'axios'
import {
  handleRequest,
  handleRequestError,
  handleResponse,
  handleResponseError
} from './interceptors'

const axiosInstance = axios.create({
  timeout: 5000,
  baseURL: process.env.REACT_APP_API_URL
})

axiosInstance.interceptors.request.use(handleRequest, handleRequestError)
axiosInstance.interceptors.response.use(handleResponse, handleResponseError)

export default axiosInstance
