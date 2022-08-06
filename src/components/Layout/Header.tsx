import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { VscChevronLeft } from 'react-icons/vsc'
import { FiLogIn, FiUser } from 'react-icons/fi'
import theme from '@constants/theme'
import Link from 'next/link'
import { useEffect, useState, useCallback } from 'react'
import { MYINFO_URL, LOGIN_URL, USER_URL, HOME_URL } from '@constants/pageUrl'

const { mainPink, mainWhite, borderLight } = theme.color
const { headerHeight, pagePadding } = theme.layout

const MYINFO = '내정보'
const USER = '메뉴판'

export const Header = () => {
  const router = useRouter()
  const { pathname } = router
  const [title, setTitle] = useState('')
  const onClickPrev = () => {
    router.back()
  }

  const handlePathChange = useCallback((pathname: string) => {
    if (pathname === MYINFO_URL) {
      setTitle(MYINFO)
    }
    if (pathname.includes(USER_URL)) {
      setTitle(USER)
    }
  }, [])

  useEffect(() => {
    setTitle('')
    pathname && handlePathChange(pathname)
  }, [pathname, handlePathChange])

  return (
    <HeaderContainer>
      <StyledBackIcon onClick={onClickPrev} />
      {title ? (
        <Title>{title}</Title>
      ) : (
        <Link href={HOME_URL}>
          <a>
            <Logo>맛이 어때</Logo>
          </a>
        </Link>
      )}
      <InnerRight>
        <Link href={MYINFO_URL}>
          <a>
            <StyledUserIcon />
          </a>
        </Link>
        <Link href={LOGIN_URL}>
          <a>
            <StyledLoginIcon />
          </a>
        </Link>
      </InnerRight>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  height: ${headerHeight};
  position: fixed;
  max-width: 50rem;
  margin: 0 auto;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: ${mainPink};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${pagePadding};
  color: ${mainWhite};
`

const StyledBackIcon = styled(VscChevronLeft)`
  width: 3rem;
  height: 3rem;
  cursor: pointer;
`

const Title = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  font-weight: 700;
  white-space: nowrap;
`

const Logo = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;
`

const InnerRight = styled.div`
  position: absolute;
  top: 50%;
  right: ${pagePadding};
  transform: translateY(-50%);
  display: flex;

  & > * {
    margin-left: 2rem;
  }
`

const StyledUserIcon = styled(FiUser)`
  width: 3rem;
  height: 3rem;
  cursor: pointer;
`
const StyledLoginIcon = styled(FiLogIn)`
  width: 3rem;
  height: 3rem;
  cursor: pointer;
`

export default Header
