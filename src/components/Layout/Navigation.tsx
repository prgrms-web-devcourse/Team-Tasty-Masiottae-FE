import styled from '@emotion/styled'
import { AiOutlinePlusSquare } from 'react-icons/ai'
import { BiHomeAlt, BiSearch } from 'react-icons/bi'
import { VscBook } from 'react-icons/vsc'
import theme from '@constants/theme'

const { mainPink, mainWhite, borderLight } = theme.color
const { navHeight, pagePadding } = theme.layout

export const Navigation = () => {
  return (
    <NavContainer>
      <NavList>
        <NavItem>
          <StyledHome />
        </NavItem>
        <NavItem>
          <StyledPlus />
        </NavItem>
        <NavItem>
          <StyledSearch />
        </NavItem>
        <NavItem>
          <StyledMenu />
        </NavItem>
      </NavList>
    </NavContainer>
  )
}

const NavContainer = styled.div`
  height: ${navHeight};
  position: fixed;
  max-width: 500px;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: #ffffff;
  border-bottom: 1px solid ${borderLight};
  padding: 0 ${pagePadding};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${borderLight};
  background-color: ${mainWhite};
`

const NavList = styled.ul`
  display: flex;
  flex: 1;
  height: 100%;
  padding: 0;
  align-items: center;

  a {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const NavItem = styled.li`
  width: 25%;
  text-align: center;
  cursor: pointer;
  list-style: none;

  &:hover {
    color: ${mainPink};
  }
`

const StyledHome = styled(BiHomeAlt)`
  width: 30px;
  height: 30px;
`
const StyledPlus = styled(AiOutlinePlusSquare)`
  width: 30px;
  height: 30px;
`

const StyledSearch = styled(BiSearch)`
  width: 30px;
  height: 30px;
`

const StyledMenu = styled(VscBook)`
  width: 30px;
  height: 30px;
`

export default Navigation
