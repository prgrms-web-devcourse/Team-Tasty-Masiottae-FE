const LOCAL_TOKEN_KEY = 'tastyToken'

export const getLocalToken = () => {
  const token =
    typeof window !== undefined && window.localStorage.getItem(LOCAL_TOKEN_KEY)
  return token
}

export const setLocalToken = (token: string) => {
  return (
    typeof window !== undefined &&
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token)
  )
}

export const removeLocalToken = () => {
  typeof window !== undefined && window.localStorage.removeItem(LOCAL_TOKEN_KEY)
}
