export interface User {
  id: number | null
  image: string
  email: string
  nickName: string
  snsAccount: string
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
  franchiseId?: number
  keyword?: string
  sort?: string
  tasteIdList?: number[]
  offset: number
  limit: number
  option?: { label: string; value: string }
}

export interface SearchFormOptions {
  keyword: string
  sort?: string
  tasteIdList: number[]
}
