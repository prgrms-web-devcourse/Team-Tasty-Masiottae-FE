import axios from '@lib/axios'
import { Option } from '@interfaces'
import { useMutation } from '@tanstack/react-query'

interface Data {
  franchiseId: number
  title: string
  content: string
  originalTitle: string
  expectedPrice: number
  optionList: Option[]
  tasteIdList: number[]
}
interface Params {
  token: string
  image: File | null
  data: Data
}

export const postMenu = async ({ token, image, data }: Params) => {
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
  console.log(image, JSON.stringify(data))

  const { data: MenuId } = await axios.post<{ menuId: number }>(
    `/menu`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `${token}`
      }
    }
  )

  return MenuId
}

export const usePostMenu = () => {
  return useMutation(postMenu)
}
