import axios from '@lib/axios'
import { useMutation } from '@tanstack/react-query'

interface Params {
  tasteName: string
  tasteColor: string
}

interface Data {
  tasteId: number
}

const postTaste = async ({ tasteName, tasteColor }: Params) => {
  const { data } = await axios.post<Data>(`/tastes`, {
    tasteName,
    tasteColor
  })

  return data
}

export const usePostTasteMutation = () => {
  return useMutation(postTaste)
}
