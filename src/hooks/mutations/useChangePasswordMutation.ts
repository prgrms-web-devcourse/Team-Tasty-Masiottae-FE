import axios from '@lib/axios'
import { useMutation } from '@tanstack/react-query'

interface Params {
  userId: string
  password: string
}

const patchPassword = async ({ userId, password }: Params) => {
  const { data } = await axios.patch(`/accounts/${userId}/password`, {
    password
  })

  return data
}

export const useChangePasswordMutation = () => {
  return useMutation(patchPassword)
}
