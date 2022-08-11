import { Menu } from '@interfaces'
import axios from '@lib/axios'
import { useQuery } from '@tanstack/react-query'
import { createSearchRequestParameter } from '@utils/queryString'
import { searchParams } from '@interfaces'

interface searchResponse {
  menu: Menu[]
}

const getMenuList = async (params: searchParams) => {
  const requestParameter = createSearchRequestParameter(params)

  const { data } = await axios.get<searchResponse>(`/menu?${requestParameter}`)
  return data
}

export const useSearchMenuList = (params: searchParams) => {
  const { keyword, tasteIdList, sort, limit, franchiseId } = params
  const { data, isLoading, error } = useQuery<searchResponse, Error>(
    ['myMenuList', keyword, tasteIdList, sort, limit, franchiseId],
    () => getMenuList(params),
    {
      enabled: franchiseId !== undefined
    }
  )

  return { menuList: data?.menu || [], isLoading, error }
}
