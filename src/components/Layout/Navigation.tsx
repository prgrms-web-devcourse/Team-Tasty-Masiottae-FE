import styled from '@emotion/styled'
import { AiOutlinePlusSquare } from 'react-icons/ai'
import { BiHomeAlt, BiSearch } from 'react-icons/bi'
import { VscBook } from 'react-icons/vsc'
import theme from '@constants/theme'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  CREATE_MENU_URL,
  USER_URL,
  SEARCH_URL,
  HOME_URL
} from '@constants/pageUrl'

const { mainPink, mainWhite, borderLight } = theme.color
const { navHeight, pagePadding } = theme.layout

type IconType = {
  selected?: boolean
}

export const Navigation = () => {
  const router = useRouter()
  const { pathname } = router

  return (
    <NavContainer>
      <NavList>
        <Link href={HOME_URL}>
          <StyledAnchor>
            <NavItem>
              <StyledHome selected={pathname === HOME_URL} />
            </NavItem>
          </StyledAnchor>
        </Link>
        <Link href={CREATE_MENU_URL}>
          <StyledAnchor>
            <NavItem>
              <StyledPlus selected={pathname === CREATE_MENU_URL} />
            </NavItem>
          </StyledAnchor>
        </Link>
        <Link href={SEARCH_URL}>
          <StyledAnchor>
            <NavItem>
              <StyledSearch selected={pathname === SEARCH_URL} />
            </NavItem>
          </StyledAnchor>
        </Link>
        <Link href={USER_URL}>
          <StyledAnchor>
            <NavItem>
              {/* //todo신영 USER_URL 뒤에 /userId query param 넘겨주기 */}
              <StyledMenu selected={pathname === USER_URL} />
            </NavItem>
          </StyledAnchor>
        </Link>
      </NavList>
    </NavContainer>
  )
}
const StyledAnchor = styled.a`
  width: 25%;
  text-align: center;
  cursor: pointer;
  list-style: none;

  &:hover {
    color: ${mainPink};
  }
`

const NavContainer = styled.div`
  height: ${navHeight};
  position: fixed;
  max-width: 50rem;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: #ffffff;
  border-bottom: 0.1rem solid ${borderLight};
  padding: 0 ${pagePadding};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 0.1rem solid ${borderLight};
  background-color: ${mainWhite};
`

const NavList = styled.ul`
  display: flex;
  flex: 1;
  height: 100%;
  padding: 0;
  align-items: center;
`

const NavItem = styled.li``

const StyledHome = styled(BiHomeAlt)<IconType>`
  width: 3rem;
  height: 3rem;
  color: ${({ selected }) => selected && theme.color.mainPink};
`

const StyledPlus = styled(AiOutlinePlusSquare)<IconType>`
  width: 3rem;
  height: 3rem;
  color: ${({ selected }) => selected && theme.color.mainPink};
`

const StyledSearch = styled(BiSearch)<IconType>`
  width: 3rem;
  height: 3rem;
  color: ${({ selected }) => selected && theme.color.mainPink};
`

const StyledMenu = styled(VscBook)<IconType>`
  width: 3rem;
  height: 3rem;
  color: ${({ selected }) => selected && theme.color.mainPink};
`

export default Navigation
