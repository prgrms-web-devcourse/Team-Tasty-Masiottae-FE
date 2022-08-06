import { searchParams } from '@interfaces'

export const createSearchRequestParameter = (params: searchParams) => {
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
  return requestParameter
}
