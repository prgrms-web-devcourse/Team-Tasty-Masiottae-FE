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

const getMyMenuList = async (option: string, params: searchParams) => {
  const requestParameter = createSearchRequestParameter(params)
  const { data } = await axios.get<searchResponse>(
    `/${option}-menu?${requestParameter}`
  )
  return {
    menu: data.menu,
    nextPage: {
      offset: params.offset + params.limit,
      limit: params.limit
    },
    isLast: !data.menu
  }
}

export const useSearchMyMenuList = (params: searchParams) => {
  const { keyword, tasteIdList, sort, limit, offset, option } = params

  const { data, isLoading, error, fetchNextPage } = useInfiniteQuery<
    searchResponse,
    Error
  >(
    ['myMenuList', keyword, tasteIdList, sort, limit, offset, option],
    ({ pageParam = { offset: 0, limit: 5 } }) => {
      return getMyMenuList(option?.value || 'my', {
        ...params,
        offset: pageParam.offset,
        limit: pageParam.limit
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
