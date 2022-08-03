import axios from '@lib/axios'
import { Menu } from '@interfaces'
import { useQuery } from '@tanstack/react-query'

const getMenuById = async (menuId: string) => {
  const { data } = await axios.get<Menu>(`/menu/${menuId}`)

  return data
}

export const useMenu = (menuId: string) => {
  return useQuery<Menu, Error>(['menu', menuId], () => getMenuById(menuId))
}
