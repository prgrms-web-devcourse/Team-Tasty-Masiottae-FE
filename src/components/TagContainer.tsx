import { Taste } from '@customTypes/index'
import styled from '@emotion/styled'
import Tag from './Tag'
import { dummyTasteList as tasteList } from '@constants/dummyMenu'
import { useState } from 'react'
interface Props {
  selectedTasteList: Taste[]
  onChange: (selectedTagList: number[]) => void
  width?: number
  height?: number
  gap?: number
  tagHeight?: number
  backgroundColor?: string
}
const TagContainer = ({
  selectedTasteList,
  onChange,
  width,
  height = 20,
  gap = 0.8,
  tagHeight = 3.2,
  backgroundColor = '#d9d9d9'
}: Props) => {
  const [tagIdList, setTagIdList] = useState(
    selectedTasteList.map((taste) => taste.id)
  )
  const handleClickTag = (clickedTagId: number) => {
    setTagIdList((tagIdList) => {
      let newTagList = tagIdList
      if (tagIdList.includes(clickedTagId)) {
        newTagList = tagIdList.filter((id) => id !== clickedTagId)
      } else {
        newTagList = [...tagIdList, clickedTagId]
      }
      onChange(newTagList)
      return newTagList
    })
  }

  return (
    <Container
      width={width}
      height={height}
      gap={gap}
      backgroundColor={backgroundColor}
    >
      {tasteList.map((taste) => (
        <Tag
          key={taste.id}
          id={taste.id}
          name={taste.name}
          color={taste.color}
          height={tagHeight}
          onClick={handleClickTag}
          isClicked={
            selectedTasteList.find((selected) => selected.id === taste.id)
              ? true
              : false
          }
        ></Tag>
      ))}
    </Container>
  )
}

const Container = styled.div<{
  width: number | undefined
  height: number
  gap: number
  backgroundColor: string
}>`
  width: ${({ width }) => (width ? `${width}rem` : '100%')};
  height: ${({ height }) => `${height}rem`};
  display: flex;
  align-content: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0.8rem;
  background-color: ${({ backgroundColor }) => backgroundColor};
  overflow-y: scroll;
  gap: ${({ gap }) => `${gap}rem`};
  ::-webkit-scrollbar {
    display: none;
  }
`
export default TagContainer
