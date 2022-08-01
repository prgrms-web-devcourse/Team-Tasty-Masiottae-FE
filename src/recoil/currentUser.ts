import { atom } from 'recoil'
import { User } from '@interfaces'

export const currentUser = atom<User>({
  key: 'currentUser',
  default: {
    id: 1,
    image:
      'https://user-images.githubusercontent.com/79133602/181918487-b0e0d98c-3520-40f2-947b-7ba9f4422cd4.PNG',
    role: 'ROLE_ACCOUNT',
    email: 'example@naver.com',
    nickname: '계란이 좋아',
    snsAccount: 'example@naver.com',
    createdAt: '2022-07-28T15:10:59.2186394',
    updatedAt: '2022-07-28T15:10:59.2186394',
    menuCount: 0
  }
})
