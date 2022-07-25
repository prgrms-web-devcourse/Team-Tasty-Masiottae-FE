import styled from '@emotion/styled'
import { useState } from 'react'

interface Prop {
  name: string
  size: number
}

const Tag = ({ name, size }: Prop) => {
  const [clicked, setClicked] = useState(false)
  const handleClick = () => {
    setClicked(!clicked)
  }

  return (
    <Item size={size} isClicked={clicked} onClick={handleClick}>
      {name}
    </Item>
  )
}

export default Tag

const Item = styled.div<{ size: number; isClicked: boolean }>`
  display: inline-flex;
  width: fit-content;
  height: ${({ size }) => `${size}rem`}
  justify-content: center;
  align-items: center;
  font-size: ${({ size }) => `${size * 0.7}rem`};
  border-radius : ${({ size }) => `${size}rem`};
  padding: 1rem;
  background-color: blue;
  opacity : ${({ isClicked }) => `${isClicked ? `1` : `0.5`}`};
  color: white;
  &:hover {
    cursor: pointer;
  }
`
