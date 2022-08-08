import { atom } from 'recoil'
import { User } from '@interfaces'

export const currentUser = atom<User>({
  key: 'currentUser',
  default: {
    id: 1,
    image: '',
    email: 'example@naver.com',
    nickName: '계란이 좋아',
    snsAccount: 'example@naver.com',
    createdAt: '2022-07-28T15:10:59.2186394',
    menuCount: 0
  }
})
