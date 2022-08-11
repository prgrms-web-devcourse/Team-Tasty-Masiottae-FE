import type { NextPage } from 'next'
import useIntersectionObserver from '@hooks/useIntersectionObserver'
import MenuCardList from '@components/MenuCardList'
import { useSearchMenuList } from '@hooks/queries/useSearchMenuList'

const Home: NextPage = () => {
  const { menuList } = useSearchMenuList({
    offset: 0,
    limit: 10,
    franchiseId: 0
  })

  const ref = useIntersectionObserver(
    async (entry, observer) => {
      observer.unobserve(entry.target)
    },
    { threshold: 0.5 }
  )

  return (
    <>
      <MenuCardList menuList={menuList} divRef={ref} />
    </>
  )
}

export default Home
