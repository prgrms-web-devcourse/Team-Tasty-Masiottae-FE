import Avatar from '@components/Avatar'
import MenuCardList from '@components/MenuCardList'
import SearchForm from '@components/SearchForm'
import styled from '@emotion/styled'
import { useMenuList } from '@hooks/queries/useMenuList'
import useIntersectionObserver from '@hooks/useIntersectionObserver'
import { MouseEvent, useState } from 'react'
import { SORT_OPTIONS } from '@constants/searchOption'
import { useSearchMyMenuList } from '../../src/hooks/queries/useSearchMyMenuList'

const SELECT_DUMMY = ['작성한 메뉴', '좋아요한 메뉴']
const SIZE_100_IMG_URL = 'https://via.placeholder.com/100'

interface TabProps {
  selected: boolean
  value: string
  onClick: (e: MouseEvent<HTMLElement>) => void
}

const UserMenu = () => {
  const { data } = useSearchMyMenuList(1, {
    offset: 0,
    limit: 10,
    tasteList: [],
    keyword: '민'
  })
  console.log(data)
  const [option, setOption] = useState(SELECT_DUMMY[0])
  const { menuList } = useMenuList()
  const ref = useIntersectionObserver(
    async (entry, observer) => {
      observer.unobserve(entry.target)
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
          <SearchForm sortOptions={SORT_OPTIONS} />
        </InnerWrapper>
      </FixedWrapper>
      <CardListContainer>
        <MenuCardList menuList={menuList} divRef={ref} />
      </CardListContainer>
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

const CardListContainer = styled.ul`
  padding-top: 31.25rem;
`

export default UserMenu
