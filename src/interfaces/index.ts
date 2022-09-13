export interface User {
  id: number | null
  image: string
  email: string
  nickName: string
  createdAt: string
  menuCount: number
}

export interface Menu {
  id: number
  franchise: Franchise
  image: string
  title: string
  originalTitle: string
  author: User
  content: string
  optionList: Option[]
  expectedPrice: number
  tasteList: Taste[]
  likes: number
  isLiked: boolean
  comments: number
  createdAt: string
  updatedAt: string
}

export interface Comment {
  id: number
  menuId: number
  author: User
  comment: string
  createdAt: string
}

export interface Option {
  name: string
  description: string
}

export interface Franchise {
  id: number
  image: string
  name: string
}

export interface Taste {
  id: number
  name: string
  color: string
}

export interface searchParams {
  page: number
  size: number
  franchiseId?: number
  keyword?: string
  sort?: string
  tasteIdList?: number[]
  option?: string
  accountId?: number
}

export interface SearchFormOptions {
  keyword: string
  tasteIdList: number[]
  sort?: string
  accountId?: number
  franchiseId?: number
  option?: string
}

export interface UserFormValues {
  image?: File | null
  email: string
  nickNameCheck: string
  emailCheck: string
  nickName: string
  password: string
  passwordConfirm: string
}
