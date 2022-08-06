import type { NextPage } from 'next'
import useIntersectionObserver from '@hooks/useIntersectionObserver'
import MenuCardList from '@components/MenuCardList'
import { useMenuList } from '@hooks/queries/useMenuList'
import MenuCard from '@components/MenuCard'

const Home: NextPage = () => {
  const { menuList } = useMenuList()

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
