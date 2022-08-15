import axios from '@lib/axios'
import { Menu } from '@interfaces'
import { useQuery } from '@tanstack/react-query'

const getMenuByUserId = async (userId: number) => {
  const { data } = await axios.get<Menu>(`/accounts/${userId}/menu`)

  return data
}

export const useMenuByUserId = (userId: number) => {
  return useQuery<Menu, Error>(['menuByUserId', userId], () =>
    getMenuByUserId(userId)
  )
}
