import { atom } from 'recoil'
import { User } from '@interfaces'
import { v1 } from 'uuid'
import { DEFAULT_USER_IMAGE } from '@constants/image'
import { setCookie, getCookie } from '@utils/cookie'
import { REFRESH_TOKEN_EXPIRE_DATE, CURRENT_USER } from '@constants/token'

export const initialUser = {
  id: null,
  image: DEFAULT_USER_IMAGE,
  email: '',
  nickName: '',
  snsAccount: '',
  createdAt: '',
  menuCount: 0
}

const makeCookieEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = getCookie(key)

    if (savedValue != null) {
      setSelf(savedValue || initialUser)
    }

    onSet((newValue: User, _: any, isReset: boolean) => {
      const expirationDate = getCookie(REFRESH_TOKEN_EXPIRE_DATE)
      isReset
        ? setCookie(key, '')
        : setCookie(key, JSON.stringify(newValue), {
            path: '/',
            expires: new Date(expirationDate)
          })
    })
  }

export const currentUser = atom<User>({
  key: `currentUser/${v1()}`,
  default: initialUser,
  effects: [makeCookieEffect(CURRENT_USER)]
})
