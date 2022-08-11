import { searchParams } from '@interfaces'

export const createSearchRequestParameter = (params: searchParams) => {
  const requestParameter = new URLSearchParams(
    `?offset=${params.offset}&limit=${params.limit}&sort=recent`
  )
  if (params.franchiseId !== undefined) {
    requestParameter.set('franchiseId', params.franchiseId.toString())
  }
  if (params.keyword) {
    requestParameter.set('keyword', params.keyword)
  }
  if (params.tasteIdList && params.tasteIdList.length !== 0) {
    console.log(params.tasteIdList)
    requestParameter.set('tasteIdList', `${params.tasteIdList.join(',')}`)
  }
  if (params.sort) {
    requestParameter.set('sort', `${params.sort}`)
  }
  return requestParameter
}
