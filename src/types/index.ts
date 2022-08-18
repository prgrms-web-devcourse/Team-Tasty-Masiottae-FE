import theme from '@constants/theme'
import { Taste } from '@interfaces'
declare module '@emotion/react' {
  export interface Theme {
    color: Color
    layout: Layout
  }
}

type Color = typeof theme.color
type Layout = typeof theme.layout

export type TasteType = keyof Taste

export type ImageType = string | ArrayBuffer | null
