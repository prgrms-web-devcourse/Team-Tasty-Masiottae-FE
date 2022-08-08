import axios from '@lib/axios'
import { useMutation } from '@tanstack/react-query'

interface Params {
  menuId: number
}

const deleteMenu = async ({ menuId }: Params) => {
  const { data } = await axios.delete(`/menu/${menuId}`)

  return data
}

export const useDeleteMenuMutation = () => {
  return useMutation(deleteMenu)
}
