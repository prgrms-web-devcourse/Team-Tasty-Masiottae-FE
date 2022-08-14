import Avatar from '@components/Avatar'
import MenuCardList from '@components/MenuCardList'
import SearchForm from '@components/SearchForm'
import styled from '@emotion/styled'
import useIntersectionObserver from '@hooks/useIntersectionObserver'
import { MouseEvent, useEffect, useState } from 'react'
import { useSearchMyMenuList } from '../../src/hooks/queries/useSearchMyMenuList'
import { SearchFormOptions, searchParams } from '@interfaces'
import SkeletonCardList from '@components/SkeletonCardList'
import { useUser } from '../../src/hooks/queries/useUser'
import { useRouter } from 'next/router'
import { SkeletonFranchiseInfo } from '@components/SkeletonFranchiseList'

const SELECT_OPTION = [
  { label: '작성한 메뉴', value: 'my' },
  { label: '좋아요한 메뉴', value: 'like' }
]

interface TabProps {
  selected: boolean
  value: string
  onClick: (e: MouseEvent<HTMLElement>) => void
}

const UserMenu = () => {
  const router = useRouter()
  const id = parseInt(router.query.id as string)
  const [searchOptions, setSearchOptions] = useState<searchParams>({
    option: SELECT_OPTION[0],
    offset: 0,
    limit: 10,
    accountId: id
  })
  const {
    menuList,
    isLoading: isMenuLoading,
    fetchNextPage
  } = useSearchMyMenuList(searchOptions)
  const { data: user, isLoading: isUserLoading } = useUser(id)

  const ref = useIntersectionObserver(
    async (entry, observer) => {
      observer.unobserve(entry.target)
      fetchNextPage()
    },
    { threshold: 0.5 }
  )

  useEffect(() => {
    if (!router.isReady) return
    setSearchOptions({ ...searchOptions, accountId: id })
  }, [router.isReady])

  const handleSubmit = (values: SearchFormOptions) => {
    setSearchOptions({ ...searchOptions, ...values })
  }

  const handleTabClick = (e: MouseEvent<HTMLElement>) => {
    const divElement = e.target as HTMLButtonElement
    setSearchOptions({
      ...searchOptions,
      sort: 'recent',
      tasteIdList: [],
      keyword: '',
      option: { label: divElement.innerText, value: divElement.value }
    })
  }

  return (
    <>
      {isUserLoading ? (
        <SkeletonFranchiseInfo />
      ) : (
        <ProfileContainer>
          <Avatar size={7} src={user?.image} isLoading={false} />
          <Author>{user?.nickName}</Author>
        </ProfileContainer>
      )}
      <TabContainer>
        {SELECT_OPTION.map((selectOption, idx) => (
          <Tab
            key={idx}
            selected={searchOptions.option?.value === selectOption.value}
            value={selectOption.value}
            onClick={handleTabClick}
          >
            {selectOption.label}
          </Tab>
        ))}
      </TabContainer>
      <StickyWrapper>
        <SearchForm
          onSubmit={handleSubmit}
          searchDomain={searchOptions.option?.value}
        />
      </StickyWrapper>

      <CardListContainer>
        {isMenuLoading ? (
          <SkeletonCardList size={2} />
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
  top: 6.3rem;
  padding: 1rem 0;
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
  box-sizing: content-box;
  cursor: pointer;
`

const CardListContainer = styled.ul``

export default UserMenu
