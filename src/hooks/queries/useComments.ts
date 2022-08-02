import axios from '@lib/axios'
import { Comment } from '@interfaces'
import { useQuery } from '@tanstack/react-query'

const getCommentsByMenuId = async (menuId: string) => {
  const { data } = await axios.get<Comment[]>(`/menu/${menuId}/comments`)

  return data
}

export const useMenu = (menuId: string) => {
  return useQuery<Comment[], Error>(['comments', menuId], () =>
    getCommentsByMenuId(menuId)
  )
}
