import styled from '@emotion/styled'
import useIntersectionObserver from '@hooks/useIntersectionObserver'
import { useRouter } from 'next/router'
import MenuCardList from '@components/MenuCardList'
import SearchForm from '@components/SearchForm'
import { useMenuList } from '@hooks/queries/useMenuList'
import FranchiseInfo from '@components/FranchiseInfo'
import { useFranchiseList } from '@hooks/queries/useFranchiseList'
const Search = () => {
  const router = useRouter()
  const id = parseInt(router.query.category as string)
  const { franchiseList, isLoading } = useFranchiseList()
  const { menuList } = useMenuList()

  const ref = useIntersectionObserver(
    async (entry, observer) => {
      observer.unobserve(entry.target)
    },
    { threshold: 0.5 }
  )

  return (
    <Container>
      <FixedWrapper>
        <InnerWrapper>
          <FranchiseInfo
            franchise={franchiseList?.find((franchise) => franchise.id === id)}
            isLoading={isLoading}
          />
          <SearchForm
            onSubmit={() => {
              return
            }}
          />
        </InnerWrapper>
      </FixedWrapper>
      <CardListWrapper>
        <MenuCardList menuList={menuList} divRef={ref} />
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
  padding-top: 22rem;
`

export default Search
