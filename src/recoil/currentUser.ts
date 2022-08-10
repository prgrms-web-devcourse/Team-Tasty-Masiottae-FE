import { atom } from 'recoil'
import { User } from '@interfaces'
import { v1 } from 'uuid'
import { DEFAULT_USER_IMAGE } from '@constants/image'

const initialUser = {
  id: 1,
  image: DEFAULT_USER_IMAGE,
  email: '',
  nickName: '',
  snsAccount: '',
  createdAt: '',
  menuCount: 0
}

const localStorage = typeof window !== undefined ? window.localStorage : null

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage && localStorage.getItem(key)

    if (savedValue != null) {
      setSelf(JSON.parse(savedValue) || initialUser)
    }

    onSet((newValue: string, _: any, isReset: boolean) => {
      isReset
        ? localStorage && localStorage.removeItem(key)
        : localStorage && localStorage.setItem(key, JSON.stringify(newValue))
    })
  }

export const currentUser = atom<User>({
  key: `currentUser/${v1()}`,
  default: initialUser,
  effects: [localStorageEffect(`currentUser`)]
})
