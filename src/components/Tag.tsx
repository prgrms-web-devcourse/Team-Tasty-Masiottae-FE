import styled from '@emotion/styled'
import { useState } from 'react'

interface Props {
  name: string
  height: number
  onClick: (clickedTag: string) => void
}

const Tag = ({ name, height, onClick }: Props) => {
  const [clicked, setClicked] = useState(false)
  const handleClick = (name: string) => {
    setClicked((clicked) => !clicked)
    onClick(name)
  }

  return (
    <Item
      name={name}
      height={height}
      isClicked={clicked}
      onClick={() => handleClick(name)}
    >
      {name}
    </Item>
  )
}

const Item = styled.div<{ name: string; height: number; isClicked: boolean }>`
  display: inline-flex;
  width: fit-content;
  height: ${({ height }) => `${height}rem`};
  justify-content: center;
  align-items: center;
  font-size: ${({ height }) => `${height * 0.7}rem`};
  border-radius: ${({ height }) => `${height}rem`};
  padding: 1rem 2rem;
  background-color: ${(props) => props.theme.taste[`${props.name}`]};
  opacity: ${({ isClicked }) => `${isClicked ? `1` : `0.5`}`};
  color: white;
  &:hover {
    cursor: pointer;
  }
`

export default Tag
