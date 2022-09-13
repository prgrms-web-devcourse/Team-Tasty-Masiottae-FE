import { SearchFormOptions, searchParams } from '@interfaces'
import { ParsedUrlQuery } from 'querystring'

export const createSearchRequestParameter = (params: searchParams) => {
  const requestParameter = new URLSearchParams(
    `?page=${params.page}&size=${params.size}&sort=recent`
  )
  if (params.accountId) {
    requestParameter.set('accountId', params.accountId.toString())
  }
  if (params.franchiseId !== undefined) {
    requestParameter.set('franchiseId', params.franchiseId.toString())
  }
  if (params.keyword) {
    requestParameter.set('keyword', params.keyword)
  }
  if (params.tasteIdList && params.tasteIdList.length !== 0) {
    requestParameter.set('tasteIdList', `${params.tasteIdList.join(',')}`)
  }
  if (params.sort) {
    requestParameter.set('sort', `${params.sort}`)
  }
  return requestParameter
}

export const createSearchOptionParameter = (params: SearchFormOptions) => {
  const qs = `/${params.accountId ? 'user' : 'search'}/${
    params.accountId ? params.accountId : params.franchiseId
  }?${params.sort ? `sort=${params.sort}` : `sort=recent`}${
    params.keyword ? `&keyword=${params.keyword}` : ''
  }${
    params.tasteIdList.length > 0
      ? `&tasteIdList=${params.tasteIdList.join(',')}`
      : ''
  }${params.option ? `&option=${params.option}` : '&option=my'}`

  return qs
}

export const convertQueryStringToObject = (query: ParsedUrlQuery) => {
  const { sort, tasteIdList, keyword, option } = query

  return {
    sort: typeof sort === 'string' ? sort : 'recent',
    tasteIdList:
      typeof tasteIdList === 'string'
        ? tasteIdList.split(',').map((val) => parseInt(val))
        : undefined,
    keyword: typeof keyword === 'string' ? keyword : undefined,
    option: typeof option === 'string' ? option : 'my'
  }
}
