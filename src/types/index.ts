import theme from '@constants/theme'
declare module '@emotion/react' {
  export interface Theme {
    color: Color
    layout: Layout
    taste: Taste
  }
}

type Color = typeof theme.color
type Layout = typeof theme.layout
type Taste = typeof theme.taste

export type TasteType = keyof Taste
