import styled from '@emotion/styled'

interface Props {
  isValid?: boolean
  errorMessage: string
  successMessage?: string
}

const InputMessage = ({
  isValid = false,
  errorMessage,
  successMessage = ''
}: Props) => {
  const message = isValid ? successMessage : errorMessage
  return (
    <Message isValid={isValid} errorMessage={errorMessage}>
      {message}
    </Message>
  )
}

const Message = styled.span<Props>`
  margin-top: 1rem;
  font-size: 1.4rem;
  margin-left: 1rem;
  color: ${(props) =>
    props.isValid ? props.theme.color.success : props.theme.color.error};
`

export default InputMessage
