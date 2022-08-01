export interface User {
  id: number
  image: string
  role: 'ROLE_ACCOUNT' | 'ROLE_ADMIN'
  email: string
  nickname: string
  snsAccount: string
  createdAt: string
  updatedAt: string
  menuCount: number
}
