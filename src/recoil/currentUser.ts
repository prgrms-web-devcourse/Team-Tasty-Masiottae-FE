import { atom } from 'recoil'
import { User } from '@interfaces'
import { v1 } from 'uuid'
import { DEFAULT_USER_IMAGE } from '@constants/image'

export const currentUser = atom<User>({
  key: `currentUser/${v1()}`,
  default: {
    id: 1,
    image: DEFAULT_USER_IMAGE,
    email: '',
    nickName: 'test',
    snsAccount: '',
    createdAt: '',
    menuCount: 0
  }
})
