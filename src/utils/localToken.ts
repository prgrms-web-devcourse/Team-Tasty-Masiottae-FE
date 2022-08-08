const LOCAL_TOKEN_KEY = 'tastyToken'
const LOCAL_TOKEN_EXPIRE_DATE = 'tastyToken_expire'

interface Data {
  accessToken: string
  expirationTime: string
}

export const getLocalToken = () => {
  const token =
    typeof window !== undefined && window.localStorage.getItem(LOCAL_TOKEN_KEY)
  return token
}

export const setLocalToken = ({ accessToken, expirationTime }: Data) => {
  if (typeof window !== undefined) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, accessToken)
    window.localStorage.setItem(LOCAL_TOKEN_EXPIRE_DATE, expirationTime)
  }
}

export const removeLocalToken = () => {
  if (typeof window !== undefined) {
    window.localStorage.removeItem(LOCAL_TOKEN_KEY)
    window.localStorage.removeItem(LOCAL_TOKEN_EXPIRE_DATE)
  }
}
