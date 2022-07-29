import Input from '@components/Input'
import MenuCard from '@components/MenuCard'
import styled from '@emotion/styled'
import useIntersectionObserver from '@hooks/useIntersectionObserver'
import { Card, PostCardDummy } from '@constants/cardData'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { BsFilterLeft } from 'react-icons/bs'
import Link from 'next/link'

const SORT_OPTIONS = ['최신순', '좋아요순', '댓글순']

const Search = () => {
  const [cards, setCards] = useState(PostCardDummy)
  const ref = useIntersectionObserver(
    async (entry, observer) => {
      observer.unobserve(entry.target)
      setCards([...cards, Card])
    },
    { threshold: 0.5 }
  )
  const router = useRouter()
  const { category } = router.query

  return (
    <Container>
      <SearchWrapper>
        <SearchInput
          height={5}
          type="text"
          placeholder={`${category} 메뉴 검색`}
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
      <CardListWrapper>
        {cards.map((cardData, idx) => {
          return (
            <MenuCardWrapper key={idx}>
              <Link href={`/detail/${cardData.id}`}>
                <a>
                  <MenuCard
                    key={idx}
                    title={cardData.title}
                    imageUrl={cardData.imageUrl}
                    avatarImageUrl={cardData.avatarImageUrl}
                    author={cardData.author}
                    likes={cardData.likes}
                    comments={cardData.comments}
                    divRef={cards.length === idx + 1 ? ref : null}
                  />
                </a>
              </Link>
            </MenuCardWrapper>
          )
        })}
      </CardListWrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  gap: 1rem;
  height: 100%;
`

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
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
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: scroll;
  row-gap: 1rem;

  ::-webkit-scrollbar {
    display: none;
  }
`

const MenuCardWrapper = styled.li``

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
