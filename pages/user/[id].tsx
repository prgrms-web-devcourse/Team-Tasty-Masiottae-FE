import { MouseEvent, useEffect, useState } from 'react'
import {
  Avatar,
  MenuCardList,
  SearchForm,
  SkeletonCardList
} from '@components/common'
import styled from '@emotion/styled'
import useIntersectionObserver from '@hooks/common/useIntersectionObserver'
import { useSearchMyMenuList } from '@hooks/queries/useSearchMyMenuList'
import { SearchFormOptions, searchParams } from '@interfaces'
import { useUser } from '@hooks/queries/useUser'
import { useRouter } from 'next/router'
import {
  convertQueryStringToObject,
  createSearchOptionParameter
} from '@utils/queryString'
import { SkeletonFranchiseInfo } from '@components/common/SkeletonFranchiseList'
import { scrollRestore } from '@utils/scroll'

export async function getServerSideProps() {
  return {
    props: {}
  }
}

interface TabProps {
  selected: boolean
  value: string
  onClick: (e: MouseEvent<HTMLElement>) => void
}

const UserMenu = () => {
  const router = useRouter()
  const id = parseInt(router.query.id as string)
  const urlOptions = convertQueryStringToObject(router.query)
  const [searchOptions, setSearchOptions] = useState<searchParams>({
    ...urlOptions,
    page: 1,
    size: 10,
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
    scrollRestore()
  }, [])

  const handleSubmit = (values: SearchFormOptions) => {
    setSearchOptions({ ...searchOptions, ...values })
    router.replace(
      `${createSearchOptionParameter({
        ...searchOptions,
        ...values,
        accountId: id
      })}`
    )
  }

  const handleTabClick = (e: MouseEvent<HTMLElement>) => {
    const divElement = e.target as HTMLButtonElement
    setSearchOptions({
      ...searchOptions,
      sort: 'recent',
      tasteIdList: [],
      keyword: '',
      option: divElement.value
    })
    router.replace(
      `${createSearchOptionParameter({
        ...searchOptions,
        sort: 'recent',
        tasteIdList: [],
        keyword: '',
        option: divElement.value
      })}`
    )
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
        <Tab
          selected={searchOptions.option === 'my'}
          value="my"
          onClick={handleTabClick}
        >
          작성한 메뉴
        </Tab>
        <Tab
          selected={searchOptions.option === 'like'}
          value="like"
          onClick={handleTabClick}
        >
          좋아요한 메뉴
        </Tab>
      </TabContainer>
      <StickyWrapper>
        <SearchForm
          onSubmit={handleSubmit}
          searchDomain={searchOptions.option}
          initialValue={{
            sort: searchOptions.sort || 'recent',
            keyword: searchOptions.keyword || '',
            tasteIdList: searchOptions.tasteIdList || []
          }}
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
