import {
  TOKEN_KEY,
  TOKEN_EXPIRE_DATE,
  REFRESH_TOKEN_KEY,
  REFRESH_TOKEN_EXPIRE_DATE,
  CURRENT_USER
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
  setCookie(TOKEN_KEY, token, {
    path: '/',
    expires: new Date(expirationDate)
  })
  setCookie(TOKEN_EXPIRE_DATE, expirationDate, {
    path: '/',
    expires: new Date(expirationDate)
  })
}

export const getToken = () => {
  return getCookie(TOKEN_KEY)
}

export const getTokenData = () => {
  const tokenData = {
    [TOKEN_KEY]: getCookie(TOKEN_KEY),
    [TOKEN_EXPIRE_DATE]: getCookie(TOKEN_EXPIRE_DATE),
    [REFRESH_TOKEN_KEY]: getCookie(REFRESH_TOKEN_KEY),
    [REFRESH_TOKEN_EXPIRE_DATE]: getCookie(REFRESH_TOKEN_EXPIRE_DATE),
    [CURRENT_USER]: getCookie(CURRENT_USER)
  }
  return tokenData
}

export const setTokenData = ({ accessToken, account, refreshToken }: Data) => {
  setCookie(TOKEN_KEY, accessToken.token, {
    path: '/',
    expires: new Date(refreshToken.expirationDate)
  })
  setCookie(TOKEN_EXPIRE_DATE, accessToken.expirationDate, {
    path: '/',
    expires: new Date(refreshToken.expirationDate)
  })
  setCookie(REFRESH_TOKEN_KEY, refreshToken.token, {
    path: '/',
    expires: new Date(refreshToken.expirationDate)
  })
  setCookie(REFRESH_TOKEN_EXPIRE_DATE, refreshToken.expirationDate, {
    path: '/',
    expires: new Date(refreshToken.expirationDate)
  })
  setCookie(CURRENT_USER, JSON.stringify(account), {
    path: '/',
    expires: new Date(refreshToken.expirationDate)
  })
}

export const removeTokenData = () => {
  removeCookie(TOKEN_KEY)
  removeCookie(TOKEN_EXPIRE_DATE)
  removeCookie(REFRESH_TOKEN_KEY)
  removeCookie(REFRESH_TOKEN_EXPIRE_DATE)
  removeCookie(CURRENT_USER)
}
