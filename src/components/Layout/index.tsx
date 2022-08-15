import styled from '@emotion/styled'
import { ReactNode, useState, useEffect } from 'react'
import Header from './Header'
import Navigation from './Navigation'
import { useRouter } from 'next/router'
import { PASSWORD_CHANGE_URL, LOGIN_URL, SIGNUP_URL } from '@constants/pageUrl'

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  const [isShow, setIsShow] = useState(true)
  const router = useRouter()
  const { pathname } = router
  const isPathChangeNavigation =
    pathname === LOGIN_URL ||
    pathname === PASSWORD_CHANGE_URL ||
    pathname === SIGNUP_URL

  useEffect(() => {
    if (isPathChangeNavigation) {
      setIsShow(false)
      return
    }
    setIsShow(true)
  }, [pathname, isPathChangeNavigation])

  return (
    <Container id="default-template-container">
      <Header />
      <StyledMain>{children}</StyledMain>
      {isShow && <Navigation />}
    </Container>
  )
}

const StyledMain = styled.main`
  flex: 1;
  padding: 6.4rem 2rem;
  background-color: #ffffff;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 50rem;
  min-height: 100vh;
  margin: 0 auto;
  background-color: '#FFFFFF';
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 31.25rem) {
    width: 100%;
  }
`

export default Layout
