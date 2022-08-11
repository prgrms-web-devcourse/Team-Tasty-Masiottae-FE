import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { VscChevronLeft } from 'react-icons/vsc'
import { FiLogIn, FiUser } from 'react-icons/fi'
import Link from 'next/link'
import { useEffect, useState, useCallback } from 'react'
import { MYINFO_URL, LOGIN_URL, USER_URL, HOME_URL } from '@constants/pageUrl'
import { getLocalToken } from '@utils/localToken'

const MYINFO = '내정보'
const USER = '메뉴판'

export const Header = () => {
  const router = useRouter()
  const { pathname } = router
  const [title, setTitle] = useState('')
  const [token, setToken] = useState('')

  const onClickPrev = () => {
    router.back()
  }

  useEffect(() => {
    if (pathname === LOGIN_URL || pathname === HOME_URL) {
      setToken(getLocalToken() || '')
    }
  }, [token, pathname])

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
      {pathname !== LOGIN_URL && (
        <InnerRight>
          {token ? (
            <Link href={MYINFO_URL}>
              <a>
                <StyledUserIcon />
              </a>
            </Link>
          ) : (
            <Link href={LOGIN_URL}>
              <a>
                <StyledLoginIcon />
              </a>
            </Link>
          )}
        </InnerRight>
      )}
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  height: ${(props) => props.theme.layout.headerHeight};
  position: fixed;
  max-width: 50rem;
  margin: 0 auto;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: ${(props) => props.theme.color.mainPink};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${(props) => props.theme.layout.pagePadding};
  color: ${(props) => props.theme.color.mainWhite};
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
  right: ${(props) => props.theme.layout.pagePadding};
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
