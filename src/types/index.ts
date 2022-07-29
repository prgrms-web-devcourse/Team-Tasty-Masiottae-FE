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

type Color = typeof theme.color
type Layout = typeof theme.layout

export type TasteType = keyof Taste

export type ImageType = string | ArrayBuffer | null
