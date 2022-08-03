import axios from '@lib/axios'
import { User } from '@interfaces'
import { useQuery } from '@tanstack/react-query'

const getUserById = async (userId: string) => {
  const { data } = await axios.get<User>(`/accounts/${userId}`)

  return data
}

export const useUser = (userId: string) => {
  return useQuery<User, Error>(['user', userId], () => getUserById(userId))
}
