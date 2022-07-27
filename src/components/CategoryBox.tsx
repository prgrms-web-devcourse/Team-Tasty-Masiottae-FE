import styled from '@emotion/styled'
import { ReactNode } from 'react'

interface Props {
  imageUrl: string
  children: ReactNode
}

const CategoryBox = ({ children, imageUrl }: Props) => {
  return (
    <BoxContainer imageUrl={imageUrl}>
      <Text>{children}</Text>
    </BoxContainer>
  )
}

const BoxContainer = styled.div<{ imageUrl: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12rem;
  height: 12rem;

  position: relative;
  z-index: 1;
  background-size: cover;
  cursor: pointer;

  ::after {
    width: 100%;
    height: 100%;
    content: '';
    border-radius: 2rem;
    background: ${({ imageUrl }) => `no-repeat top center url(${imageUrl})`};
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0.7;
  }

  :hover {
    ::after {
      opacity: 0.99;
    }
  }
`

const Text = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  font-size: 2.2rem;
  font-weight: bold;
`

export default CategoryBox
