import theme from './theme'
import { TastesType } from '@customTypes/index'
export const TASTE_LIST: TastesType[] = Object.keys(theme.taste) as TastesType[]
