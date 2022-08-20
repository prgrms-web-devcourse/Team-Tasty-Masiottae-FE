import { useMutation } from '@tanstack/react-query'
import axios from '@lib/axios'

interface Params {
  commentId: number
  comment: string
}

const patchCommnet = async ({ commentId, comment }: Params) => {
  const { data } = await axios.patch(`/comments/${commentId}`, {
    comment
  })

  return data
}

export const usePatchCommentMutation = () => {
  return useMutation(patchCommnet)
}
