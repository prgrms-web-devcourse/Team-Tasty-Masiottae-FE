import Avatar from '@components/Avatar'
import Input from '@components/Input'
import MenuCard from '@components/MenuCard'
import { Card, PostCardDummy } from '@constants/cardData'
import styled from '@emotion/styled'
import useIntersectionObserver from '@hooks/useIntersectionObserver'
import { MouseEvent, useState } from 'react'
import { BsFilterLeft } from 'react-icons/bs'
import { FiSearch } from 'react-icons/fi'

const SORT_OPTIONS = ['최신순', '좋아요순', '댓글순']

const dummy = ['작성한 메뉴', '좋아요한 메뉴']

interface TabProps {
  selected: boolean
  value: string
  onClick: (e: MouseEvent<HTMLElement>) => void
}

const UserMenuPage = () => {
  const [option, setOption] = useState(dummy[0])
  const [cards, setCards] = useState(PostCardDummy)
  const ref = useIntersectionObserver(
    async (entry, observer) => {
      observer.unobserve(entry.target)
      setCards([...cards, Card])
    },
    { threshold: 0.5 }
  )

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    const divElement = e.target as HTMLElement
    setOption(divElement.innerText)
  }

  return (
    <>
      <ProfileContainer>
        <Avatar
          size={10}
          src={'https://via.placeholder.com/100'}
          isLoading={false}
        />
        <Author>작성자</Author>
      </ProfileContainer>
      <TabContainer>
        {dummy.map((val) => (
          <Tab
            key={val}
            selected={option === val}
            value={val}
            onClick={handleClick}
          >
            {val}
          </Tab>
        ))}
      </TabContainer>
      <Container>
        <SearchWrapper>
          <SearchInput height={5} type="text" placeholder={`메뉴 검색`} />
          <SearchIcon />
        </SearchWrapper>
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
              <MenuCard
                id={cardData.id}
                key={idx}
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
        </CardListWrapper>
      </Container>
    </>
  )
}
const ProfileContainer = styled.div`
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
`

const Author = styled.div`
  font-size: 2.4rem;
  font-weight: bold;
  user-select: none;
`

const TabContainer = styled.div`
  display: flex;
  justify-content: space-around;
`

const Tab = styled.button<TabProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border: none;
  padding: 0 2rem;
  font-size: 2.2rem;
  font-weight: bold;
  border-bottom: ${({ selected }) => (selected ? '3px solid red' : 'none')};
  height: 5rem;
`

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

const CardListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: scroll;
  row-gap: 1rem;

  ::-webkit-scrollbar {
    display: none;
  }
`

const Text = styled.span`
  font-size: 2rem;
  user-select: none;
`

export default UserMenuPage
