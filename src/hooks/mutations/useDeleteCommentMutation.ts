import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from '@lib/axios'

interface Params {
  commentId: number
}

interface Data {
  menuId: number
}

const deleteComment = async ({ commentId }: Params) => {
  const { data } = await axios.delete<Data>(`/comments/${commentId}`)

  return data
}

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteComment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([`comments`, data.menuId])
    }
  })
}
