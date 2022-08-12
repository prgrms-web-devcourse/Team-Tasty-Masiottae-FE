import { Menu } from '@interfaces'
import axios from '@lib/axios'
import { useInfiniteQuery } from '@tanstack/react-query'
import { createSearchRequestParameter } from '@utils/queryString'
import { searchParams } from '@interfaces'

interface searchResponse {
  menu: Menu[]
  nextPage: {
    offset: number
    limit: number
  }
  isLast: boolean
}

const getMenuList = async (params: searchParams) => {
  const requestParameter = createSearchRequestParameter(params)

  const { data } = await axios.get<searchResponse>(`/menu?${requestParameter}`)
  return {
    menu: data.menu,
    nextPage: {
      offset: params.offset + params.limit,
      limit: params.limit
    },
    isLast: !data
  }
}

export const useSearchMenuList = (params: searchParams) => {
  const { keyword, tasteIdList, sort, limit, franchiseId, offset } = params

  const { data, isLoading, error, fetchNextPage } = useInfiniteQuery<
    searchResponse,
    Error
  >(
    ['myMenuList', keyword, tasteIdList, sort, limit, offset, franchiseId],
    ({ pageParam = { offset: 0, limit: 10 } }) => {
      return getMenuList({
        ...params,
        offset: pageParam.offset,
        limit: pageParam.limit
      })
    },
    {
      getNextPageParam: (lastPage) => {
        return !lastPage.isLast ? lastPage.nextPage : undefined
      },
      enabled: !!franchiseId
    }
  )

  const menuList = data?.pages
    .map((value) => value?.menu)
    .flat()
    .filter((val) => !!val)

  return {
    menuList,
    isLoading,
    error,
    fetchNextPage
  }
}
