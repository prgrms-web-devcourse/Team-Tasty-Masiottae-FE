import styled from '@emotion/styled'
import { useState } from 'react'
import { TasteNameType } from '@customTypes/index'
interface Props {
  name: TasteNameType
  height: number
  isClicked?: boolean
  onClick: (clickedTag: TasteNameType) => void
}

const Tag = ({ name, height, isClicked = false, onClick }: Props) => {
  const [clicked, setClicked] = useState(isClicked)
  const handleClick = (name: TasteNameType) => {
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

const Item = styled.div<{
  name: TasteNameType
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
  background-color: ${(props) => props.theme.taste[props.name]};
  opacity: ${({ isClicked }) => `${isClicked ? `1` : `0.5`}`};
  color: white;
  &:hover {
    cursor: pointer;
  }
`

export default Tag
