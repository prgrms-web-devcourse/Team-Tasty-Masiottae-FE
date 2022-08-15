import axios from '@lib/axios'
import { Comment } from '@interfaces'
import { useQuery } from '@tanstack/react-query'

const getCommentListByMenuId = async (menuId: number) => {
  const { data } = await axios.get<Comment[]>(`/menu/${menuId}/comments`)

  return data
}

export const useCommentList = (menuId: number) => {
  return useQuery<Comment[], Error>(
    ['comments', menuId],
    () => getCommentListByMenuId(menuId),
    { enabled: !!menuId }
  )
}
