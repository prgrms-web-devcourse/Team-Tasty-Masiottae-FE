import type { NextPage } from 'next'
import useIntersectionObserver from '@hooks/useIntersectionObserver'
import MenuCardList from '@components/MenuCardList'
import { useSearchMenuList } from '@hooks/queries/useSearchMenuList'
import SkeletonCardList from '@components/SkeletonCardList'
import BannerCard from '@components/BannerCard'
import { MAIN_BANNER_IMAGE } from '@constants/image'
import styled from '@emotion/styled'
import { useState } from 'react'

const BANNER_TEXT = '나만의 커스텀 메뉴를 공유해보세요'

const Home: NextPage = () => {
  const { menuList, isLoading, fetchNextPage } = useSearchMenuList({
    offset: 0,
    limit: 10,
    franchiseId: 0
  })

  const [isBannerClosed, setIsBannerClosed] = useState(true)

  const ref = useIntersectionObserver(
    async (entry, observer) => {
      observer.unobserve(entry.target)
      fetchNextPage()
    },
    { threshold: 0.5 }
  )

  return (
    <>
      {isBannerClosed && (
        <BannerContainer>
          <BannerCard
            src={MAIN_BANNER_IMAGE}
            isClosed={false}
            content={BANNER_TEXT}
          />
        </BannerContainer>
      )}

      {isLoading ? (
        <SkeletonCardList size={4} />
      ) : (
        <MenuCardList menuList={menuList || []} divRef={ref} />
      )}
    </>
  )
}

const BannerContainer = styled.div`
  margin: 1rem 0;
`

export default Home
