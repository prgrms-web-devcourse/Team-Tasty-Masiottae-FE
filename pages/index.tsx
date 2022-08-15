import type { NextPage } from 'next'
import useIntersectionObserver from '@hooks/useIntersectionObserver'
import MenuCardList from '@components/MenuCardList'
import { useSearchMenuList } from '@hooks/queries/useSearchMenuList'
import SkeletonCardList from '@components/SkeletonCardList'

const Home: NextPage = () => {
  const { menuList, isLoading, fetchNextPage } = useSearchMenuList({
    offset: 0,
    limit: 10,
    franchiseId: 0
  })

  const ref = useIntersectionObserver(
    async (entry, observer) => {
      observer.unobserve(entry.target)
      fetchNextPage()
    },
    { threshold: 0.5 }
  )

  return (
    <>
      {isLoading ? (
        <SkeletonCardList size={4} />
      ) : (
        <MenuCardList menuList={menuList || []} divRef={ref} />
      )}
    </>
  )
}

export default Home
