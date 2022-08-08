import axios from '@lib/axios'
import { Option } from '@interfaces'
import { useMutation } from '@tanstack/react-query'

interface Data {
  userId?: number
  franchiseId?: number
  title?: string
  content?: string
  originalTitle?: string
  expectedPrice?: number
  optionList?: Option[]
  tasteIdList?: number[]
}
interface Params {
  menuId: number
  image: File | null
  data: Data
}

export const patchMenu = async ({ menuId, image, data }: Params) => {
  const formData = new FormData()
  if (image) {
    formData.append('image', image)
  }
  formData.append(
    'data',
    new Blob([JSON.stringify(data)], {
      type: 'application/json'
    })
  )

  await axios.post(`/menu/${menuId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export const useChangeMenu = () => {
  return useMutation(patchMenu)
}
