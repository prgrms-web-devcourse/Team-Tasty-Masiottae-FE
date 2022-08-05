import { Menu } from '@interfaces'
import axios from '@lib/axios'
import { useQuery } from '@tanstack/react-query'

interface Params {
  keyword?: string
  sort?: 'recent' | 'comment' | 'like'
  tasteList: number[]
  offset: number
  limit: number
}

const getMyMenuList = async (accountId: number, params: Params) => {
  const requestParameter = new URLSearchParams(
    `?offset=${params.offset}&limit=${params.limit}&sort=recent`
  )
  if (params.keyword) {
    requestParameter.set('keyword', params.keyword)
  }
  if (params.tasteList.length !== 0) {
    requestParameter.set('tasteList', `${params.tasteList.join(',')}`)
  }
  if (params.sort) {
    requestParameter.set('sort', `${params.sort}`)
  }

  console.log(requestParameter)

  const { data } = await axios.get<Menu[]>(
    `/accounts/${accountId}/menu?${requestParameter}`
  )
  return data
}

export const useSearchMyMenuList = (accountId: number, params: Params) => {
  return useQuery<Menu[], Error>(['myMenuList', accountId], () =>
    getMyMenuList(accountId, params)
  )
}
