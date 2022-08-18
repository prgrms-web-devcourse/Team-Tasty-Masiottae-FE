import styled from '@emotion/styled'
import { DEFAULT_USER_IMAGE } from '@constants/image'

interface Props {
  size: number
  isLoading: boolean
  src: string | undefined
}

const Avatar = styled.div<Props>`
  width: ${({ size }) => size}rem;
  height: ${({ size }) => size}rem;
  background: ${({ isLoading, src }) =>
    isLoading
      ? `gray`
      : `no-repeat top center url(${src || DEFAULT_USER_IMAGE})`};
  background-size: cover;
  border-radius: 50%;
  cursor: pointer;
`

export default Avatar
