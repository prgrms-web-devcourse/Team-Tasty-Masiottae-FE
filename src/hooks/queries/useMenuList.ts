import axios from '@lib/axios'
import { Menu } from '@interfaces'
import { useQuery } from '@tanstack/react-query'

const getMenuList = async () => {
  const { data } = await axios.get<Menu[]>(`/menu`)

  return data
}

export const useMenuList = () => {
  const { data, isLoading } = useQuery<Menu[], Error>(['menuList'], getMenuList)

  return { menuList: data || [], isLoading }
}
