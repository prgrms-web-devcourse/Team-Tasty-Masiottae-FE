import axios from '@lib/axios'
import { Franchise } from '@interfaces'
import { useQuery } from '@tanstack/react-query'

const getFranchiseList = async () => {
  const { data } = await axios.get<Franchise[]>(`/franchises`)

  return data
}

export const useFranchiseList = () => {
  return useQuery<Franchise[], Error>(['franchises'], getFranchiseList, {
    staleTime: Infinity
  })
}
