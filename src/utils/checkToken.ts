import { AxiosRequestConfig } from 'axios'
import { getTokenData, setToken, removeTokenData } from '@utils/cookie'
import moment from 'moment'
import axios from 'axios'

export const checkToken = async (config: AxiosRequestConfig) => {
  const {
    currentUser,
    tastyToken,
    tastyToken_expire,
    tastyRefreshToken,
    tastyRefreshToken_expire
  } = getTokenData()

  if (!config?.headers) {
    throw new Error(`Axios config headers must be provided`)
  }

  if (
    moment(tastyRefreshToken_expire).diff(moment(), 'minutes') < 1 &&
    tastyRefreshToken
  ) {
    removeTokenData()
  }

  if (
    (moment(tastyToken_expire).diff(moment(), 'minutes') < 1 || !tastyToken) &&
    tastyRefreshToken
  ) {
    const { data } = await axios.post(`/api/re-issue`, {
      email: currentUser.email,
      accessToken: tastyToken,
      refreshToken: tastyRefreshToken
    })
    setToken(data)
    config.headers.Authorization = data.token
  } else {
    config.headers.Authorization = tastyToken
  }
  return config
}
