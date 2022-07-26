import styled from '@emotion/styled'

interface Props {
  id?: number
  name: string
  color: string
  height: number
  isClicked?: boolean
  onClick?: (clickedTag: number) => void
}

const Tag = ({
  id,
  name,
  height,
  color,
  isClicked = false,
  onClick
}: Props) => {
  const handleClick = (id: number) => {
    id && onClick && onClick(id)
  }

  return (
    <Item
      name={name}
      color={color}
      height={height}
      isClicked={isClicked}
      readOnly={!id}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClick={id ? () => handleClick(id) : () => {}}
    >
      {name}
    </Item>
  )
}

const Item = styled.div<{
  name: string
  color: string
  height: number
  readOnly: boolean
  isClicked: boolean
}>`
  display: inline-flex;
  width: fit-content;
  height: ${({ height }) => `${height}rem`};
  justify-content: center;
  align-items: center;
  font-size: ${({ height }) => `${height * 0.7}rem`};
  font-weight: 600;
  border-radius: ${({ height }) => `${height}rem`};
  padding: 1.8rem 2.4rem;
  border: ${({ color }) => `0.3rem solid ${color}`};
  background-color: ${({ isClicked, readOnly, color }) =>
    readOnly ? `${color}` : isClicked ? `${color}` : `#ffffff`};
  color: ${({ readOnly, isClicked, color }) =>
    readOnly ? `${color}` : isClicked ? `#ffffff` : `${color}`};
  &:hover {
    cursor: ${({ readOnly }) => (readOnly ? '' : 'pointer')};
  }

  @media screen and (max-width: 26.25rem) {
    padding: 1.6rem 1.6rem;
  }
`

export default Tag
