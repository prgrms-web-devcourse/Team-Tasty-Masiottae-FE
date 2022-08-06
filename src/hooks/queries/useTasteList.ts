import axios from '@lib/axios'
import { Taste } from '@interfaces'
import { useQuery } from '@tanstack/react-query'

const getTasteList = async () => {
  const { data } = await axios.get<Taste[]>(`/tastes`)
  return data
}

export const useTasteList = () => {
  return useQuery<Taste[], Error>(['tasteList'], getTasteList, {
    staleTime: Infinity
  })
}
