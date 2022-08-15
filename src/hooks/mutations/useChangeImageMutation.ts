import axios from '@lib/axios'
import { useMutation } from '@tanstack/react-query'

interface Params {
  userId: number
  image: File
}

interface Data {
  image: string
}

const patchImage = async ({ userId, image }: Params) => {
  const form = new FormData()
  form.append('image', image)

  const { data } = await axios.post<Data>(`/accounts/${userId}/image`, form, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

  return data
}

export const useChangeImageMutation = () => {
  return useMutation(patchImage)
}
