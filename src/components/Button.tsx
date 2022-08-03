import styled from '@emotion/styled'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width?: number
  height?: number
  color?: string
  backgroundColor?: string
  fontSize?: number
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  className?: string
}

type StyleType = Pick<
  Props,
  'width' | 'height' | 'color' | 'backgroundColor' | 'fontSize'
>

const Button = ({
  width,
  height = 7,
  color,
  backgroundColor,
  fontSize = 1.6,
  children,
  onClick,
  disabled = false,
  className
}: Props) => {
  return (
    <StyledButton
      width={width}
      height={height}
      color={color}
      backgroundColor={backgroundColor}
      fontSize={fontSize}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button<StyleType>`
  width: ${({ width }) => (width ? `${width}rem` : '100%')};
  height: ${({ height }) => `${height}rem`};
  color: ${({ color }) => color};
  background-color: ${({ backgroundColor }) => backgroundColor};
  font-size: ${({ fontSize }) => `${fontSize}rem`};

  border: none;
  border-radius: 1rem;

  cursor: pointer;
  padding: 0 1.6rem;
  white-space: nowrap;

  &:hover {
    opacity: 0.7;
  }
  &:active {
    opacity: 0.7;
  }
  :disabled {
    opacity: 0.7;
  }
`

export default Button
