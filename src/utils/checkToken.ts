import { AxiosRequestConfig } from 'axios'
import { getTokenData, setToken } from '@utils/cookie'
import moment from 'moment'
import axios from 'axios'

export const checkToken = async (config: AxiosRequestConfig) => {
  const { currentUser, tastyToken, tastyToken_expire, tastyRefreshToken } =
    getTokenData()

  if (!config?.headers) {
    throw new Error(`Axios config headers must be provided`)
  }

  if (
    moment(tastyToken_expire).diff(moment(), 'minutes') < 10 &&
    tastyRefreshToken
  ) {
    console.log('요청하지')
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/re-issue`,
      {
        email: currentUser.email,
        accessToken: tastyToken,
        refreshToken: tastyRefreshToken
      }
    )
    setToken(data)
    config.headers.Authorization = data.token
  } else {
    console.log('요청 안하지')
    config.headers.Authorization = tastyToken
  }
  return config
}
