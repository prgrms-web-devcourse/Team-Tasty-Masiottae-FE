import styled from '@emotion/styled'
import useIntersectionObserver from '@hooks/useIntersectionObserver'
import { useRouter } from 'next/router'
import MenuCardList from '@components/MenuCardList'
import SearchForm from '@components/SearchForm'
import { useMenuList } from '@hooks/queries/useMenuList'
import { SORT_OPTIONS } from '@constants/searchOption'

const Search = () => {
  const router = useRouter()
  const { category } = router.query
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
          <CategoryHeader>{category}</CategoryHeader>
          <SearchForm
            sortOptions={SORT_OPTIONS}
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

const CategoryHeader = styled.div`
  height: 8rem;
  font-size: 2rem;
  text-align: center;
  padding: 3rem;
  background-color: gray;
  box-sizing: border-box;
  user-select: none;
`

export default Search
