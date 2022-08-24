import { useEffect, useState } from 'react'
import { SearchFormOptions, searchParams } from '@interfaces'
import styled from '@emotion/styled'
import useIntersectionObserver from '@hooks/common/useIntersectionObserver'
import { useRouter } from 'next/router'
import {
  SearchForm,
  MenuCardList,
  FranchiseInfo,
  SkeletonCardList
} from '@components/common'
import { useFranchiseList } from '@hooks/queries/useFranchiseList'
import { useSearchMenuList } from '@hooks/queries/useSearchMenuList'

/**
 *
 * 상태가 필요한 부분?
 * queryString으로 검색 조건을 전부 맞추면 어떨까?
 *
 *
 *
 * Submit 발생 부
 * 1. 정렬 선택 : url 바꾸고 나서
 *
 * 1. 정렬 => 선택시 상태변경이 아니라 라우터 변경
 * 2. 맛태그 =>
 */

const Search = () => {
  const router = useRouter()
  const id = parseInt(router.query.category as string)
  const [searchOptions, setSearchOptions] = useState<searchParams>({
    offset: 0,
    limit: 10
  })
  const { franchiseList } = useFranchiseList()
  const {
    menuList,
    isLoading: isMenuListLoading,
    fetchNextPage
  } = useSearchMenuList(searchOptions)

  useEffect(() => {
    if (!router.isReady) return
    setSearchOptions({ offset: 0, limit: 10, franchiseId: id })
  }, [router.isReady, id])

  const handleSubmit = (values: SearchFormOptions) => {
    setSearchOptions({ ...searchOptions, ...values })
  }

  const ref = useIntersectionObserver(
    async (entry, observer) => {
      observer.unobserve(entry.target)
      fetchNextPage()
    },
    { threshold: 0.5 }
  )

  const getFranchise = () => {
    return searchOptions.franchiseId === 0
      ? { id: 0, name: '전체', image: '/ALL.png' }
      : franchiseList?.find(
          (franchise) => franchise.id === searchOptions.franchiseId
        )
  }

  return (
    <Container>
      <FixedWrapper>
        <InnerWrapper>
          <FranchiseInfo franchise={getFranchise()} />
          <SearchForm onSubmit={handleSubmit} />
        </InnerWrapper>
      </FixedWrapper>
      <CardListWrapper>
        {isMenuListLoading ? (
          <SkeletonCardList size={2} />
        ) : (
          <MenuCardList menuList={menuList || []} divRef={ref} />
        )}
      </CardListWrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
`

const FixedWrapper = styled.div`
  position: fixed;
  top: 6.4rem;
  left: 0;
  width: 100%;
`

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 33.5rem;
  max-width: 46rem;
  width: 100%;
  background-color: white;
  margin: 0 auto;
  padding-bottom: 1rem;
  box-sizing: border-box;

  @media screen and (max-width: 31.25rem) {
    padding: 0 2rem;
  }
`

const CardListWrapper = styled.ul`
  padding-top: 20rem;
`

export default Search
