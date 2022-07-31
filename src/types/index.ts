import theme from '@constants/theme'
declare module '@emotion/react' {
  export interface Theme {
    color: Color
    layout: Layout
  }
}

export interface Taste {
  id: number
  name: string
  color: string
}
export interface Option {
  name: string
  description: string
}

export interface Menu {
  id: number
  franchise: Franchise
  image: ImageType
  title: string
  originalTitle: string
  author: User
  content: string
  optionList: Option[]
  expectedPrice: number
  tasteList: Taste[]
  comments: number
  likes: number
  createdAt: string
  updatedAt: string
}

export interface User {
  id: number
  image: ImageType
  role: string | null
  nickname: string
  email: string
  createdAt: string
  updatedAt: string
}

export interface Franchise {
  id: number
  image: ImageType
  franchise: string
}


type Color = typeof theme.color
type Layout = typeof theme.layout

export type TasteType = keyof Taste

export type ImageType = string | ArrayBuffer | null
