export const getSessionStorageItem = (key: string) => {
  if (typeof window === undefined) return
  return window.sessionStorage.getItem(key)
}

export const setSessionStorageItem = (key: string, value: string) => {
  if (typeof window === undefined) return
  window.sessionStorage.setItem(key, value)
}
