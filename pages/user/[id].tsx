import Avatar from '@components/Avatar'
import MenuCardList from '@components/MenuCardList'
import SearchForm from '@components/SearchForm'
import styled from '@emotion/styled'
import useIntersectionObserver from '@hooks/useIntersectionObserver'
import { MouseEvent, useState } from 'react'
import { useSearchMyMenuList } from '../../src/hooks/queries/useSearchMyMenuList'
import { SearchFormOptions } from '@interfaces'
import SkeletonCardList from '@components/SkeletonCardList'

const SELECT_DUMMY = ['작성한 메뉴', '좋아요한 메뉴']
const SIZE_100_IMG_URL = 'https://via.placeholder.com/100'

interface TabProps {
  selected: boolean
  value: string
  onClick: (e: MouseEvent<HTMLElement>) => void
}

const UserMenu = () => {
  const [searchOptions, setSearchOptions] = useState({
    offset: 0,
    limit: 10
  })
  const { menuList, isLoading, fetchNextPage } =
    useSearchMyMenuList(searchOptions)
  const [option, setOption] = useState(SELECT_DUMMY[0])
  const ref = useIntersectionObserver(
    async (entry, observer) => {
      observer.unobserve(entry.target)
      fetchNextPage()
    },
    { threshold: 0.5 }
  )

  const handleSubmit = (values: SearchFormOptions) => {
    setSearchOptions({ ...searchOptions, ...values })
  }

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    const divElement = e.target as HTMLElement
    setOption(divElement.innerText)
  }

  return (
    <>
      <ProfileContainer>
        <Avatar size={7} src={SIZE_100_IMG_URL} isLoading={false} />
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
      <StickyWrapper>
        <SearchForm onSubmit={handleSubmit} />
      </StickyWrapper>

      <CardListContainer>
        {isLoading ? (
          <SkeletonCardList />
        ) : (
          <MenuCardList menuList={menuList || []} divRef={ref} />
        )}
      </CardListContainer>
    </>
  )
}

const StickyWrapper = styled.div`
  width: 100% auto;
  position: sticky;
  top: 6.4rem;
  padding: 0.5rem 0;
  background-color: white;
`

const ProfileContainer = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 2rem;
`

const Author = styled.div`
  font-size: 2rem;
  font-weight: 700;
  user-select: none;
`

const TabContainer = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: white;
`

const Tab = styled.button<TabProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border: none;
  padding: 0 2rem;
  font-size: 1.8rem;
  font-weight: 700;
  border-bottom: ${({ selected }) => (selected ? '3px solid red' : 'none')};
  height: 5rem;
`

const CardListContainer = styled.ul``

export default UserMenu
