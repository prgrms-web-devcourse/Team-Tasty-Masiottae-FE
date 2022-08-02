import axios from '@lib/axios'
import { Franchise } from '@interfaces'
import { useQuery } from '@tanstack/react-query'

const getFranchises = async () => {
  const { data } = await axios.get<Franchise[]>(`/franchises`)

  return data
}

export const useFranchises = () => {
  return useQuery<Franchise[], Error>(['franchises'], getFranchises)
}
