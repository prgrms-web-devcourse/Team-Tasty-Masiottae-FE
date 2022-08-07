import axios from '@lib/axios'
import { Menu } from '@interfaces'
import { useQuery } from '@tanstack/react-query'

const getMenuById = async (menuId: number) => {
  const { data } = await axios.get<Menu>(`/menu/${menuId}`)

  return data
}

export const useMenu = (menuId: number) => {
  return useQuery<Menu, Error>(['menu', menuId], () => getMenuById(menuId))
}
