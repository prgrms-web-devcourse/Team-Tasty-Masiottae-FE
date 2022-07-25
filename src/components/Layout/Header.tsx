import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { VscChevronLeft } from 'react-icons/vsc'
import { FiLogIn, FiUser } from 'react-icons/fi'

const headerHeight = '75px'
const pagePadding = '20px'
const borderLight = '#F1F1F1'

export const Header = () => {
  const router = useRouter()
  const onClickPrev = () => {
    router.back()
  }

  return (
    <HeaderContainer>
      <StyledBackIcon onClick={onClickPrev} />
      <Logo>맛이 어때</Logo>
      <InnerRight>
        <StyledUserIcon />
        <StyledLoginIcon />
      </InnerRight>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  height: ${headerHeight};
  position: fixed;
  max-width: 500px;
  margin: 0 auto;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #ffffff;
  border-bottom: 1px solid ${borderLight};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${pagePadding};
`

const StyledBackIcon = styled(VscChevronLeft)`
  width: 30px;
  height: 30px;
  cursor: pointer;
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
    margin-left: 20px;
  }
`

const StyledUserIcon = styled(FiUser)`
  width: 30px;
  height: 30px;
  cursor: pointer;
`
const StyledLoginIcon = styled(FiLogIn)`
  width: 30px;
  height: 30px;
  cursor: pointer;
`

export default Header
