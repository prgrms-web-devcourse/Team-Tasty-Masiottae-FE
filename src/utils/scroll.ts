import { getLocalStorageItem, setLocalStorageItem } from './localStorage'

export const scrollRestore = () => {
  const scrollY = getLocalStorageItem('scrollY')
  const isPopState = getLocalStorageItem('isPopState')
  if (isPopState === 'true' && scrollY !== '0') {
    setLocalStorageItem('isPopState', 'false')
    window.scrollTo(0, Number(scrollY))
    setLocalStorageItem('scrollY', '0')
  }
}
