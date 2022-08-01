import Input from '@components/Input'
import styled from '@emotion/styled'
import useIntersectionObserver from '@hooks/useIntersectionObserver'
import { MenuDummy, MenuListDummy } from '@constants/cardData'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { BsFilterLeft } from 'react-icons/bs'
import MenuCardList from '@components/MenuCardList'

const SORT_OPTIONS = ['최신순', '좋아요순', '댓글순']
const PLACEHOLDER_MENU_SEARCH = ' 메뉴 검색'

const Search = () => {
  const [menuList, setMenuList] = useState(MenuListDummy)
  const ref = useIntersectionObserver(
    async (entry, observer) => {
      observer.unobserve(entry.target)
      setMenuList([...menuList, MenuDummy])
    },
    { threshold: 0.5 }
  )
  const router = useRouter()
  const { category } = router.query

  return (
    <Container>
      <FixedWrapper>
        <InnerWrapper>
          <SearchWrapper>
            <SearchInput
              height={5}
              type="text"
              placeholder={`${category}${PLACEHOLDER_MENU_SEARCH}`}
            />
            <SearchIcon />
          </SearchWrapper>
          <CategoryHeader>{category}</CategoryHeader>
          <OptionContainer>
            <FilterWrapper>
              <FilterIcon />
              <Text>필터</Text>
            </FilterWrapper>
            <select>
              {SORT_OPTIONS.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </OptionContainer>
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

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`
const SearchInput = styled(Input)`
  width: 100%;
`

const SearchIcon = styled(FiSearch)`
  font-size: 2.5rem;
  margin-left: -3.5rem;
`

const OptionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`

const FilterIcon = styled(BsFilterLeft)`
  font-size: 3.5rem;
  font-weight: bold;
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

const Text = styled.span`
  font-size: 2rem;
  user-select: none;
`

export default Search
