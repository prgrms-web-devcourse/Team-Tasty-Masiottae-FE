import { atom } from 'recoil'
import { UserType } from '@interfaces/User'

export const currentUser = atom<UserType>({
  key: 'currentUser',
  default: {
    id: 1,
    image:
      'https://user-images.githubusercontent.com/79133602/181918487-b0e0d98c-3520-40f2-947b-7ba9f4422cd4.PNG',
    role: 'Regular',
    email: 'example@naver.com',
    nickname: '계란이 좋아',
    snsAccount: 'example@naver.com',
    createdAt: '2022-07-28T15:10:59.2186394',
    updatedAt: '2022-07-28T15:10:59.2186394',
    menuCount: 0
  }
})
