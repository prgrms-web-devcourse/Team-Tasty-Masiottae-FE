import { useCallback } from 'react'
import styled from '@emotion/styled'

interface Props {
  width?: number
  height?: number
  type: string
  name?: string
  value?: string
  accept?: string
  required?: boolean
  isValid?: boolean
  isDisabled?: boolean
  placeholder: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  className?: string
}

const Input = ({
  width,
  height,
  type,
  name,
  value,
  accept,
  required = false,
  isValid = true,
  isDisabled = false,
  placeholder,
  onChange,
  onBlur,
  className
}: Props) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e)
    },
    [onChange]
  )
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement, Element>) => {
      onBlur && onBlur(e)
    },
    [onBlur]
  )

  return (
    <StyledInput
      width={width}
      height={height}
      type={type}
      name={name}
      value={value}
      accept={accept}
      required={required}
      isValid={isValid}
      placeholder={placeholder}
      onChange={handleChange}
      onBlur={handleBlur}
      className={className}
      disabled={isDisabled}
    />
  )
}

const StyledInput = styled.input<Props>`
  width: ${({ width }) => `${width}rem`};
  height: ${({ height }) => `${height}rem`};
  border: 0.1rem solid
    ${({ theme, isValid }) =>
      isValid ? theme.color.borderBasic : theme.color.error};
  padding: 1.5rem 2.2rem;
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
    outline: none;
    border: 0.1rem solid black;
  }
`

export default Input
