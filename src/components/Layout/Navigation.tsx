import styled from '@emotion/styled'
import { AiOutlinePlusSquare } from 'react-icons/ai'
import { BiHomeAlt, BiSearch } from 'react-icons/bi'
import { VscBook } from 'react-icons/vsc'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { currentUser } from '@recoil/currentUser'
import {
  CREATE_MENU_URL,
  USER_URL,
  SEARCH_URL,
  HOME_URL
} from '@constants/pageUrl'

type IconType = {
  selected?: boolean
}

export const Navigation = () => {
  const router = useRouter()
  const { pathname } = router
  const [user] = useRecoilState(currentUser)

  return (
    <NavContainer>
      <NavList>
        <Link href={HOME_URL} passHref>
          <StyledAnchor>
            <NavItem>
              <StyledHome selected={pathname === HOME_URL} />
            </NavItem>
          </StyledAnchor>
        </Link>
        <Link href={CREATE_MENU_URL} passHref>
          <StyledAnchor>
            <NavItem>
              <StyledPlus selected={pathname === CREATE_MENU_URL} />
            </NavItem>
          </StyledAnchor>
        </Link>
        <Link href={SEARCH_URL} passHref>
          <StyledAnchor>
            <NavItem>
              <StyledSearch selected={pathname.includes(SEARCH_URL)} />
            </NavItem>
          </StyledAnchor>
        </Link>
        <Link href={`${USER_URL}/${user.id}`} passHref>
          <StyledAnchor>
            <NavItem>
              <StyledMenu selected={pathname.includes(USER_URL)} />
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
    color: ${(props) => props.theme.color.mainPink};
  }
`

const NavContainer = styled.nav`
  height: ${(props) => props.theme.layout.navHeight};
  position: fixed;
  max-width: 50rem;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: #ffffff;
  padding: 0 ${(props) => props.theme.layout.pagePadding};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 0.1rem solid ${(props) => props.theme.color.borderLight};
  background-color: ${(props) => props.theme.color.mainWhite};
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
  color: ${(props) => props.selected && props.theme.color.mainPink};
`

const StyledPlus = styled(AiOutlinePlusSquare)<IconType>`
  width: 3rem;
  height: 3rem;
  color: ${(props) => props.selected && props.theme.color.mainPink};
`

const StyledSearch = styled(BiSearch)<IconType>`
  width: 3rem;
  height: 3rem;
  color: ${(props) => props.selected && props.theme.color.mainPink};
`

const StyledMenu = styled(VscBook)<IconType>`
  width: 3rem;
  height: 3rem;
  color: ${(props) => props.selected && props.theme.color.mainPink};
`

export default Navigation
