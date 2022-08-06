import axios from '@lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface Params {
  userId: number
  menuId: number
  comment: string
}

interface Data {
  menuId: number
  commentId: number
  comment: string
}

const postComment = async ({ userId, menuId, comment }: Params) => {
  const { data } = await axios.post<Data>(`/comments`, {
    userId,
    menuId,
    comment
  })

  return data
}

export const usePostCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(postComment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([`comments`, data.menuId])
    }
  })
}
