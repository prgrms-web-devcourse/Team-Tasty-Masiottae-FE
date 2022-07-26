import styled from '@emotion/styled'
import theme from '@constants/theme'
import {
  INPUT_EMAIL,
  INPUT_NICKNAME,
  INPUT_PASSWORD,
  INPUT_PASSWORD_CONFIRM,
  INPUT_SNS,
  MESSAGE_NICKNAME,
  MESSAGE_PASSWORD,
  ERROR_EXIST_NICKNAME,
  ERROR_EXIST_EMAIL,
  ERROR_EMAIL,
  ERROR_PASSWORD_CONFIRM
} from '@constants/inputConstant'

interface Props {
  name?: string
  isValid?: boolean
  message: string
}

const InputMessage = ({ name, isValid, message }: Props) => {
  /*   const handleMessage = (name: string) => {
    switch (name) {
      case INPUT_EMAIL:
        return !isValid && ERROR_EMAIL
    }
  } */

  return <StyledMessage>{message}</StyledMessage>
}

const StyledMessage = styled.span`
  text-align: left;
  margin-top: 10px;
  margin-left: 10px;
  font-size: 14px;
  color: ${theme.color.mainRed};
`

export default InputMessage
