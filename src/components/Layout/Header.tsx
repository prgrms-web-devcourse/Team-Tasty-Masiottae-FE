import { useState, useCallback, useEffect } from 'react'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { IoChevronBackSharp } from 'react-icons/io5'
import { FiLogIn, FiUser } from 'react-icons/fi'
import Link from 'next/link'
import { MYINFO_URL, LOGIN_URL, USER_URL, HOME_URL } from '@constants/pageUrl'
import { getToken } from '@utils/cookie'
import { SMALL_LOGO } from '@constants/image'
import Image from 'next/image'

type IconType = {
  selected?: boolean
}

const TITLE_MYINFO = '내정보'
const TITLE_USER = '메뉴판'

export const Header = () => {
  const router = useRouter()
  const { pathname } = router
  const [title, setTitle] = useState('')

  const [token, setToken] = useState('')

  useEffect(() => {
    setToken(getToken() || '')
  }, [token, pathname])

  const onClickPrev = () => {
    router.back()
  }

  const handlePathChange = useCallback((pathname: string) => {
    if (pathname === MYINFO_URL) {
      setTitle(TITLE_MYINFO)
    }
    if (pathname.includes(USER_URL)) {
      setTitle(TITLE_USER)
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
            <Logo>
              <Image
                src={SMALL_LOGO}
                width="100rem"
                height="60rem"
                alt={SMALL_LOGO}
              />
            </Logo>
          </a>
        </Link>
      )}
      {pathname !== LOGIN_URL && (
        <InnerRight>
          {token ? (
            <Link href={MYINFO_URL}>
              <a>
                <StyledUserIcon selected={pathname === MYINFO_URL} />
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
  background-color: ${(props) => props.theme.color.mainWhite};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${(props) => props.theme.layout.pagePadding};
  border-bottom: 0.1rem solid ${(props) => props.theme.color.borderLight};
`

const StyledBackIcon = styled(IoChevronBackSharp)`
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
  display: block;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  font-weight: 700;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
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

const StyledUserIcon = styled(FiUser)<IconType>`
  width: 3rem;
  height: 3rem;
  color: ${(props) => props.selected && props.theme.color.mainPink};
  cursor: pointer;
`
const StyledLoginIcon = styled(FiLogIn)`
  width: 3rem;
  height: 3rem;
  cursor: pointer;
`

export default Header
