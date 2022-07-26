import { useCallback } from 'react'
import styled from '@emotion/styled'

interface Props {
  width?: number
  height?: number
  type: string
  name?: string
  accept?: string
  required?: boolean
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
  accept,
  required = false,
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
      accept={accept}
      required={required}
      placeholder={placeholder}
      onChange={handleChange}
      onBlur={handleBlur}
      className={className}
    />
  )
}

const StyledInput = styled.input`
  width: ${({ width }) => `${width}rem`};
  height: ${({ height }) => `${height}rem`};
  border: 0.1rem solid ${({ theme }) => theme.color.borderNormal};
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
