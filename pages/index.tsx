import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import type { NextPage } from 'next'
import useIntersectionObserver from '@hooks/common/useIntersectionObserver'
import { MenuCardList, SkeletonCardList, BannerCard } from '@components/common'
import { useSearchMenuList } from '@hooks/queries/useSearchMenuList'
import { MAIN_BANNER_IMAGE } from '@constants/image'
import { getLocalStorageItem } from '@utils/localStorage'
import { setLocalStorageItem } from '../src/utils/localStorage'
import {
  BANNER_CLOSE,
  BANNER_OPEN,
  BANNER_STORAGE_KEY,
  BANNER_TEXT
} from '@constants/mainPage'
import {
  getSessionStorageItem,
  setSessionStorageItem
} from '@utils/sessionStorage'

const Home: NextPage = () => {
  const { menuList, isLoading, fetchNextPage } = useSearchMenuList({
    page: 1,
    size: 10,
    franchiseId: 0
  })

  const [bannerState, setBannerState] = useState(BANNER_CLOSE)

  useEffect(() => {
    const scrollY = getLocalStorageItem('scrollY')
    const isPopState = getLocalStorageItem('isPopState')
    if (isPopState === 'true' && scrollY !== '0') {
      setLocalStorageItem('isPopState', 'false')
      window.scrollTo(0, Number(scrollY))
      setLocalStorageItem('scrollY', '0')
    }

    setBannerState(getSessionStorageItem(BANNER_STORAGE_KEY) || BANNER_OPEN)
  }, [])

  const ref = useIntersectionObserver(
    async (entry, observer) => {
      observer.unobserve(entry.target)
      fetchNextPage()
    },
    { threshold: 0.5 }
  )

  const handleBannerClose = () => {
    setBannerState(BANNER_CLOSE)
    setSessionStorageItem(BANNER_STORAGE_KEY, BANNER_CLOSE)
  }

  return (
    <>
      {isLoading ? (
        <SkeletonCardList size={4} />
      ) : (
        <>
          <BannerContainer>
            <BannerCard
              src={MAIN_BANNER_IMAGE}
              isClosed={bannerState === BANNER_CLOSE}
              content={BANNER_TEXT}
              onClose={handleBannerClose}
            />
          </BannerContainer>
          <MenuCardList menuList={menuList || []} divRef={ref} />
        </>
      )}
    </>
  )
}

const BannerContainer = styled.div`
  margin: 1rem 0;
`

export default Home
