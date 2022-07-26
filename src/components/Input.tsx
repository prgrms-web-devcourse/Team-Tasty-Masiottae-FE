import { useCallback } from 'react'
import styled from '@emotion/styled'

interface Props {
  type: string
  name: string
  accept?: string
  required?: boolean
  placeholder: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({
  type,
  name,
  accept,
  required = false,
  placeholder,
  onChange,
  onBlur
}: Props) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e)
    },
    [onChange]
  )

  const handleBlur = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onBlur && onBlur(e)
    },
    [onBlur]
  )

  return (
    <StyledInput
      type={type}
      name={name}
      accept={accept}
      required={required}
      placeholder={placeholder}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  )
}

const StyledInput = styled.input`
  width: 100%;
  padding: 2.2rem 2.2rem;
  border-radius: 1rem;
  box-sizing: border-box;

  ::placeholder {
    color: #a3a3a3;
  }

  :-webkit-autofill {
    -webkit-box-shadow: 0 0 0 100rem white inset;
    box-shadow: 0 0 0 100rem white inset;
  }

  &:focus {
    border: 0.1rem solid black;
  }
`

export default Input
