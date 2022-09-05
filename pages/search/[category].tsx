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
import {
  convertQueryStringToObject,
  createSearchOptionParameter
} from '@utils/queryString'
import { scrollRestore } from '@utils/scroll'

export async function getServerSideProps() {
  return {
    props: {}
  }
}

const Search = () => {
  const router = useRouter()
  const id = parseInt(router.query.category as string)
  const urlOptions = convertQueryStringToObject(router.query)

  const [searchOptions, setSearchOptions] = useState<searchParams>({
    ...urlOptions,
    page: 1,
    size: 10,
    franchiseId: id
  })
  const { franchiseList } = useFranchiseList()
  const { menuList, isLoading, fetchNextPage } =
    useSearchMenuList(searchOptions)

  useEffect(() => {
    scrollRestore()
  }, [])

  const handleSubmit = (values: SearchFormOptions) => {
    setSearchOptions({ ...searchOptions, ...values })
    router.replace(
      `${createSearchOptionParameter({
        ...searchOptions,
        ...values,
        franchiseId: id
      })}`
    )
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
          <SearchForm
            onSubmit={handleSubmit}
            initialValue={{
              sort: searchOptions.sort || 'recent',
              keyword: searchOptions.keyword || '',
              tasteIdList: searchOptions.tasteIdList || []
            }}
          />
        </InnerWrapper>
      </FixedWrapper>
      <CardListWrapper>
        {isLoading ? (
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
