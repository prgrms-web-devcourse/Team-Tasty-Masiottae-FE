import axios from '@lib/axios'
import { Comment } from '@interfaces'
import { useQuery } from '@tanstack/react-query'

const getCommentListByMenuId = async (menuId: string) => {
  const { data } = await axios.get<Comment[]>(`/menu/${menuId}/comments`)

  return data
}

export const useCommentList = (menuId: string) => {
  return useQuery<Comment[], Error>(['comments', menuId], () =>
    getCommentListByMenuId(menuId)
  )
}
