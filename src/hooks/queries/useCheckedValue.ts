import { useQuery } from '@tanstack/react-query'
import axios from '@lib/axios'

interface Data {
  value: string
}

const getCheckedValue = async (
  property: 'email' | 'nickName',
  value: string
) => {
  const { data } = await axios.get<Data>(
    `/accounts/check?property=${property}&value=${value}`
  )

  return data
}

export const useCheckedValue = (
  property: 'email' | 'nickName',
  value: string
) => {
  return useQuery(['checkedValue'], () => getCheckedValue(property, value))
}
