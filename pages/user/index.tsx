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
const SELECT_DUMMY = ['작성한 메뉴', '좋아요한 메뉴']
const SIZE_100_IMG_URL = 'https://via.placeholder.com/100'
interface TabProps {
  selected: boolean
  value: string
  onClick: (e: MouseEvent<HTMLElement>) => void
}

const UserMenuPage = () => {
  const [option, setOption] = useState(SELECT_DUMMY[0])
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
      <FixedWrapper>
        <InnerWrapper>
          <ProfileContainer>
            <Avatar size={10} src={SIZE_100_IMG_URL} isLoading={false} />
            <Author>작성자</Author>
          </ProfileContainer>
          <TabContainer>
            {SELECT_DUMMY.map((selectOption) => (
              <Tab
                key={selectOption}
                selected={option === selectOption}
                value={selectOption}
                onClick={handleClick}
              >
                {selectOption}
              </Tab>
            ))}
          </TabContainer>
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
        </InnerWrapper>
      </FixedWrapper>

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
    </>
  )
}

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
  padding-top: 31.25rem;
  display: flex;
  flex-direction: column;
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
