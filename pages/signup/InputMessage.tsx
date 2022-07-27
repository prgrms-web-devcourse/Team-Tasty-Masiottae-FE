import styled from '@emotion/styled'
import theme from '@constants/theme'

interface Props {
  isValid?: boolean
  message?: string
}

const InputMessage = ({ isValid = true, message }: Props) => {
  return <StyledMessage isValid={isValid}>{message}</StyledMessage>
}

const StyledMessage = styled.div<{ isValid?: boolean }>`
  text-align: left;
  margin-top: 0.2rem;
  margin-left: 1rem;
  font-size: 1.4rem;
  color: ${({ isValid }) =>
    isValid ? theme.color.fontNormal : theme.color.mainRed};
`

export default InputMessage
