import styled from '@emotion/styled'
import useIntersectionObserver from '@hooks/useIntersectionObserver'
import { MenuDummy, MenuListDummy } from '@constants/cardData'
import { useRouter } from 'next/router'
import { useState } from 'react'
import MenuCardList from '@components/MenuCardList'
import SearchForm from '@components/SearchForm'

const SORT_OPTIONS = ['최신순', '좋아요순', '댓글순']

const Search = () => {
  const router = useRouter()
  const { category } = router.query
  const [menuList, setMenuList] = useState(MenuListDummy)
  const ref = useIntersectionObserver(
    async (entry, observer) => {
      observer.unobserve(entry.target)
      setMenuList([...menuList, MenuDummy])
    },
    { threshold: 0.5 }
  )

  return (
    <Container>
      <FixedWrapper>
        <InnerWrapper>
          <CategoryHeader>{category}</CategoryHeader>
          <SearchForm sortOptions={SORT_OPTIONS} />
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
