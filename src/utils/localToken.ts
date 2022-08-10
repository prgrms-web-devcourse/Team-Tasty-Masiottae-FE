import {
  LOCAL_TOKEN_KEY,
  LOCAL_TOKEN_EXPIRE_DATE,
  LOCAL_REFRESH_TOKEN_KEY,
  LOCAL_REFRESH_TOKEN_EXPIRE_DATE
} from '@constants/token'

import { User } from '@interfaces'

interface Token {
  token: string
  expirationDate: string
}

interface Data {
  accessToken: Token
  account: User
  refreshToken: Token
}

export const getLocalToken = () => {
  const token =
    typeof window !== undefined && window.localStorage.getItem(LOCAL_TOKEN_KEY)
  return token
}

export const getTokenData = () => {
  const tokenData = typeof window !== undefined && {
    [LOCAL_TOKEN_KEY]: window.localStorage.getItem(LOCAL_TOKEN_KEY),
    [LOCAL_TOKEN_EXPIRE_DATE]: window.localStorage.getItem(
      LOCAL_TOKEN_EXPIRE_DATE
    ),
    [LOCAL_REFRESH_TOKEN_KEY]: window.localStorage.getItem(
      LOCAL_REFRESH_TOKEN_KEY
    ),
    [LOCAL_REFRESH_TOKEN_EXPIRE_DATE]: window.localStorage.getItem(
      LOCAL_REFRESH_TOKEN_EXPIRE_DATE
    )
  }
  return tokenData
}

export const setLocalToken = ({ accessToken, refreshToken }: Data) => {
  if (typeof window !== undefined) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, accessToken.token)
    window.localStorage.setItem(
      LOCAL_TOKEN_EXPIRE_DATE,
      accessToken.expirationDate
    )
    window.localStorage.setItem(LOCAL_REFRESH_TOKEN_KEY, refreshToken.token)
    window.localStorage.setItem(
      LOCAL_REFRESH_TOKEN_EXPIRE_DATE,
      refreshToken.expirationDate
    )
  }
}

export const removeLocalToken = () => {
  if (typeof window !== undefined) {
    window.localStorage.removeItem(LOCAL_TOKEN_KEY)
    window.localStorage.removeItem(LOCAL_TOKEN_EXPIRE_DATE)
    window.localStorage.removeItem(LOCAL_REFRESH_TOKEN_KEY)
    window.localStorage.removeItem(LOCAL_REFRESH_TOKEN_EXPIRE_DATE)
  }
}
