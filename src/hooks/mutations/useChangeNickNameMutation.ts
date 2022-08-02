import axios from '@lib/axios'
import { useMutation } from '@tanstack/react-query'

interface Params {
  userId: string
  nickName: string
}

interface Data {
  nickName: string
}

const patchNickName = async ({ userId, nickName }: Params) => {
  const { data } = await axios.patch<Data>(`/accounts/${userId}/nick-name`, {
    nickName
  })

  return data
}

export const useChangeNickNameMutation = () => {
  return useMutation(patchNickName)
}
