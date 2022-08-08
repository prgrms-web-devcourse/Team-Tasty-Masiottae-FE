import { atom } from 'recoil'
import { User } from '@interfaces'


const DEFAULT_USER_IMAGE =
  'https://user-images.githubusercontent.com/79133602/183457197-175f637c-c28b-4ddc-8cf1-195796fc3231.png'

export const currentUser = atom<User>({
  key: 'currentUser',
  default: {
    id: 1,
    image: DEFAULT_USER_IMAGE,
    email: 'example@naver.com',
    nickName: '계란이 좋아',
    snsAccount: 'example@naver.com',
    createdAt: '2022-07-28T15:10:59.2186394',
    menuCount: 0
  }
})
