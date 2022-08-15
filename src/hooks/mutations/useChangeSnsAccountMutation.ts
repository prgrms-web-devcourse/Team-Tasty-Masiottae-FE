import axios from '@lib/axios'
import { useMutation } from '@tanstack/react-query'

interface Params {
  userId: number
  snsAccount: string
}

interface Data {
  snsAccount: string
}

const patchSnsAccount = async ({ userId, snsAccount }: Params) => {
  const { data } = await axios.patch<Data>(`/accounts/${userId}/sns`, {
    snsAccount
  })

  return data
}

export const useChangeSnsAccountMutation = () => {
  return useMutation(patchSnsAccount)
}
