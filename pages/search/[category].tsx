import Input from '@components/Input'
import PostCard from '@components/PostCard'
import styled from '@emotion/styled'
import useIntersectionObserver from '@hooks/useIntersectionObserver'
import { Card, PostCardDummy } from '@constants/cardData'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { BsFilterLeft } from 'react-icons/bs'

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
    <>
      <Container>
        <SearchWrapper>
          <SearchInput height={5} type="text" placeholder="검색해라" />
          <SearchIcon />
        </SearchWrapper>
        <CategoryHeader>{category}</CategoryHeader>
        <FilterContainer>
          <FilterWrapper>
            <FilterIcon />
            <Text>필터</Text>
          </FilterWrapper>
          <select>
            <option>최신순</option>
            <option>좋아요순</option>
            <option>댓글순</option>
          </select>
        </FilterContainer>
        <Wrapper>
          {cards.map((cardData, idx) => {
            return (
              <PostCard
                id={cardData.id}
                key={idx.toString()}
                title={cardData.title}
                imageUrl={cardData.imageUrl}
                avatarImageUrl={cardData.avatarImageUrl}
                author={cardData.author}
                likes={cardData.likes}
                comments={cardData.comments}
                divRef={cards.length === idx + 1 ? ref : null}
              />
            )
          })}
        </Wrapper>
      </Container>
    </>
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

const FilterContainer = styled.div`
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: scroll;
  row-gap: 1rem;

  ::-webkit-scrollbar {
    display: none;
  }
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
