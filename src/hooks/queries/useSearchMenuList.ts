import { Menu } from '@interfaces'
import axios from '@lib/axios'
import { useInfiniteQuery } from '@tanstack/react-query'
import { createSearchRequestParameter } from '@utils/queryString'
import { searchParams } from '@interfaces'

interface searchResponse {
  menu: Menu[]
  nextPage: {
    page: number
    size: number
  }
  isLast: boolean
}

const getMenuList = async (params: searchParams) => {
  const requestParameter = createSearchRequestParameter(params)

  const { data } = await axios.get<searchResponse>(`/menu?${requestParameter}`)
  return {
    menu: data.menu,
    nextPage: {
      page: params.page + 1,
      size: params.size
    },
    isLast: data.isLast
  }
}

export const useSearchMenuList = (params: searchParams) => {
  const { page, size, keyword, tasteIdList, sort, franchiseId } = params

  const { data, isLoading, error, fetchNextPage } = useInfiniteQuery<
    searchResponse,
    Error
  >(
    ['menuList', page, size, keyword, tasteIdList, sort, franchiseId],
    ({ pageParam = { page: 1, size: 10 } }) => {
      return getMenuList({
        ...params,
        page: pageParam.page,
        size: pageParam.size
      })
    },
    {
      getNextPageParam: (lastPage) => {
        return !lastPage.isLast ? lastPage.nextPage : undefined
      },
      enabled: franchiseId !== undefined
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
