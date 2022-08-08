import { Menu } from '@interfaces'
import axios from '@lib/axios'
import { useQuery } from '@tanstack/react-query'
import { createSearchRequestParameter } from '@utils/queryString'
import { searchParams } from '@interfaces'

interface searchResponse {
  menu: Menu[]
}

const getMyMenuList = async (accountId: number, params: searchParams) => {
  const requestParameter = createSearchRequestParameter(params)

  const { data } = await axios.get<searchResponse>(
    `/accounts/${accountId}/menu?${requestParameter}`
  )
  return data
}

export const useSearchMyMenuList = (
  accountId: number,
  params: searchParams
) => {
  const { keyword, tasteIdList, sort, limit } = params
  const { data, isLoading, error } = useQuery<searchResponse, Error>(
    ['myMenuList', accountId, keyword, tasteIdList, sort, limit],
    () => getMyMenuList(accountId, params)
  )

  return { menuList: data?.menu || [], isLoading, error }
}
