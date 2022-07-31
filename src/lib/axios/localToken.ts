const LOCAL_TOKEN_KEY = 'tastyToken'
const storage = window.localStorage

export const getLocalToken = () => {
  const token = storage.getItem(LOCAL_TOKEN_KEY)
  return token
}

export const setLocalToken = (token: string) => {
  return storage.setItem(LOCAL_TOKEN_KEY, token)
}

export const removeLocalToken = () => {
  storage.removeItem(LOCAL_TOKEN_KEY)
}
