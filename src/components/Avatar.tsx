import styled from '@emotion/styled'

interface Props {
  size: number
  isLoading: boolean
  src: string
}

const Avatar = styled.div<Props>`
  width: ${({ size }) => size}rem;
  height: ${({ size }) => size}rem;
  background: ${({ isLoading, src }) =>
    isLoading ? `gray` : `no-repeat top center url(${src})`};
  background-size: cover;
  border-radius: 50%;
`

export default Avatar
