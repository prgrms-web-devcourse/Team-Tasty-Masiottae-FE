import axios from '@lib/axios'
import { Option } from '@interfaces'
import { useMutation } from '@tanstack/react-query'

interface Data {
  userId: number
  franchiseId: number
  title: string
  content: string
  originalTitle: string
  expectedPrice: number
  optionList: Option[]
  tasteIdList: number[]
}
interface Params {
  image: File | null
  data: Data
}

export const postMenu = async ({ image, data }: Params) => {
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

  const { data: MenuId } = await axios.post<{ menuId: number }>(
    `/menu`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
  )

  return MenuId
}

export const usePostMenu = () => {
  return useMutation(postMenu)
}
