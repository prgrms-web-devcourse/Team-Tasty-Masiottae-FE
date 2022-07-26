import theme from './theme'
import { TasteType } from '@customTypes/index'
export const TASTE_LIST: TasteType[] = Object.keys(theme.taste) as TasteType[]
