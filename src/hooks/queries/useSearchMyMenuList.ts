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

const getMyMenuList = async (option: string, params: searchParams) => {
  const requestParameter = createSearchRequestParameter(params)
  const { data } = await axios.get<searchResponse>(
    `/${option}-menu?${requestParameter}`
  )
  return {
    menu: data.menu,
    nextPage: {
      page: params.page + 1,
      size: params.size
    },
    isLast: data.isLast
  }
}

export const useSearchMyMenuList = (params: searchParams) => {
  const { page, size, keyword, tasteIdList, sort, accountId, option } = params

  const { data, isLoading, error, fetchNextPage } = useInfiniteQuery<
    searchResponse,
    Error
  >(
    ['myMenuList', page, size, keyword, tasteIdList, sort, option, accountId],
    ({ pageParam = { page: 1, size: 10 } }) => {
      return getMyMenuList(option || 'my', {
        ...params,
        page: pageParam.page,
        size: pageParam.size
      })
    },
    {
      getNextPageParam: (lastPage) => {
        return !lastPage.isLast ? lastPage.nextPage : undefined
      }
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
