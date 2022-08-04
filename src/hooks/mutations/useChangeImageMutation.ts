import axios from '@lib/axios'
import { useMutation } from '@tanstack/react-query'

interface Params {
  userId: number
  image: string
}

interface Data {
  image: string
}

const patchImage = async ({ userId, image }: Params) => {
  const form = new FormData()
  form.append('image', image)

  const { data } = await axios.patch<Data>(`/accounts/${userId}/image`, form, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

  return data
}

export const useChangeImageMutation = () => {
  return useMutation(patchImage)
}
