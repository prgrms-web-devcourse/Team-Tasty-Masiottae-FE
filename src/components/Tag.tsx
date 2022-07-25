import styled from '@emotion/styled'
import { useState } from 'react'

interface Prop {
  name: string
  size: number
  onClick: (clickedTag: string) => void
}

const Tag = ({ name, size, onClick }: Prop) => {
  const [clicked, setClicked] = useState(false)
  const handleClick = (name: string) => {
    setClicked(!clicked)
    onClick(name)
  }

  return (
    <Item
      name={name}
      size={size}
      isClicked={clicked}
      onClick={() => handleClick(name)}
    >
      {name}
    </Item>
  )
}

export default Tag

const Item = styled.div<{ name: string; size: number; isClicked: boolean }>`
  display: inline-flex;
  width: fit-content;
  height: ${({ size }) => `${size}rem`}
  justify-content: center;
  align-items: center;
  font-size: ${({ size }) => `${size * 0.7}rem`};
  border-radius : ${({ size }) => `${size}rem`};
  padding: 1rem;
  background-color: ${(props) => props.theme.taste[`${props.name}`]};
  opacity : ${({ isClicked }) => `${isClicked ? `1` : `0.5`}`};
  color: white;
  &:hover {
    cursor: pointer;
  }
`
