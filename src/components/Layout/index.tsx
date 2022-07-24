import styled from '@emotion/styled'
import { ReactNode } from 'react'
import Header from './Header'
import Navigation from './Navigation'

interface Props {
  children: ReactNode
}

const DefaultTemplate = ({ children }: Props) => {
  return (
    <Container id="default-template-container">
      <Header />
      <StyledMain>{children}</StyledMain>
      <Navigation />
    </Container>
  )
}

const StyledMain = styled.main`
  flex: 1;
  padding: 75px 0;
  background-color: #ffffff;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 500px;
  min-height: 100vh;
  overflow-x: hidden;
  margin: 0 auto;
  background-color: '#FFFFFF';
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 500px) {
    width: 100%;
  }
`

export default DefaultTemplate