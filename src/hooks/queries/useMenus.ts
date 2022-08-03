import axios from '@lib/axios'
import { Menu } from '@interfaces'
import { useQuery } from '@tanstack/react-query'

const getMenus = async () => {
  const { data } = await axios.get<Menu[]>(`/`)

  return data
}

export const useMenus = () => {
  return useQuery<Menu[], Error>(['menus'], getMenus)
}
