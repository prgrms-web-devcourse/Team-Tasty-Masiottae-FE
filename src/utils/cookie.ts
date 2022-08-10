import {
  TOKEN_KEY,
  TOKEN_EXPIRE_DATE,
  REFRESH_TOKEN_KEY,
  REFRESH_TOKEN_EXPIRE_DATE
} from '@constants/token'
import { User } from '@interfaces'
import { Cookies } from 'react-cookie'

interface Token {
  token: string
  expirationDate: string
}

interface Data {
  accessToken: Token
  account: User
  refreshToken: Token
}

const cookies = new Cookies()

export const setCookie = (name: string, value: string, option?: any) => {
  cookies.set(name, value, { ...option })
}

export const getCookie = (name: string) => {
  return cookies.get(name)
}

export const removeCookie = (name: string) => {
  cookies.remove(name)
}

export const setToken = ({ token, expirationDate }: Token) => {
  setCookie(TOKEN_KEY, token)
  setCookie(TOKEN_EXPIRE_DATE, expirationDate)
}

export const getToken = () => {
  return getCookie(TOKEN_KEY)
}

export const getTokenData = () => {
  const tokenData = {
    [TOKEN_KEY]: getCookie(TOKEN_KEY),
    [TOKEN_EXPIRE_DATE]: getCookie(TOKEN_EXPIRE_DATE),
    [REFRESH_TOKEN_KEY]: getCookie(REFRESH_TOKEN_KEY),
    [REFRESH_TOKEN_EXPIRE_DATE]: getCookie(REFRESH_TOKEN_EXPIRE_DATE)
  }
  return tokenData
}

export const setTokenData = ({ accessToken, refreshToken }: Data) => {
  setCookie(TOKEN_KEY, accessToken.token)
  setCookie(TOKEN_EXPIRE_DATE, accessToken.expirationDate)
  setCookie(REFRESH_TOKEN_KEY, refreshToken.token)
  setCookie(REFRESH_TOKEN_EXPIRE_DATE, refreshToken.expirationDate)
}

export const removeTokenData = () => {
  removeCookie(TOKEN_KEY)
  removeCookie(TOKEN_EXPIRE_DATE)
  removeCookie(REFRESH_TOKEN_KEY)
  removeCookie(REFRESH_TOKEN_EXPIRE_DATE)
}
