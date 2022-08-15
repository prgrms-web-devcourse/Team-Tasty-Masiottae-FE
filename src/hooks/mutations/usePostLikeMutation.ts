import axios from '@lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface Params {
  menuId: number
}

const postLike = async ({ menuId }: Params) => {
  const { status } = await axios.post(`/menu/${menuId}/like`)

  return status
}

export const usePostLikeMutation = ({ menuId }: Params) => {
  const queryClient = useQueryClient()

  return useMutation(postLike, {
    onSuccess: () => {
      queryClient.invalidateQueries([`menu`, menuId])
    }
  })
}
