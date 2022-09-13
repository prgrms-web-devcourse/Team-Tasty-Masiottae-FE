export const getLocalStorageItem = (key: string) => {
  if (typeof window === undefined) return
  return window.localStorage.getItem(key)
}

export const setLocalStorageItem = (key: string, value: string) => {
  if (typeof window === undefined) return
  window.localStorage.setItem(key, value)
}
