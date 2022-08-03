import type { NextPage } from 'next'
import { useState } from 'react'
import useIntersectionObserver from '@hooks/useIntersectionObserver'
import { MenuDummy, MenuListDummy } from '@constants/cardData'
import MenuCardList from '@components/MenuCardList'
import { useFranchises } from '@hooks/queries/useFranchises'

const Home: NextPage = () => {
  const { data } = useFranchises()
  console.log(data)
  const [menuList, setMenuList] = useState(MenuListDummy)
  const ref = useIntersectionObserver(
    async (entry, observer) => {
      observer.unobserve(entry.target)
      setMenuList([...menuList, MenuDummy])
    },
    { threshold: 0.5 }
  )

  return <MenuCardList menuList={menuList} divRef={ref} />
}

export default Home
