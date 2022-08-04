import styled from '@emotion/styled'
import { useState } from 'react'
interface Props {
  id: number
  name: string
  color: string
  height: number
  isClicked?: boolean
  onClick: (clickedTag: number) => void
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
    onClick(id)
  }

  return (
    <Item
      name={name}
      color={color}
      height={height}
      isClicked={isClicked}
      onClick={() => handleClick(id)}
    >
      {name}
    </Item>
  )
}

const Item = styled.div<{
  name: string
  color: string
  height: number
  isClicked: boolean
}>`
  display: inline-flex;
  width: fit-content;
  height: ${({ height }) => `${height}rem`};
  justify-content: center;
  align-items: center;
  font-size: ${({ height }) => `${height * 0.7}rem`};
  border-radius: ${({ height }) => `${height}rem`};
  padding: 1rem 2rem;
  background-color: ${({ color }) => `${color}`};
  opacity: ${({ isClicked }) => `${isClicked ? `1` : `0.3`}`};
  color: white;
  &:hover {
    cursor: pointer;
  }
`

export default Tag
