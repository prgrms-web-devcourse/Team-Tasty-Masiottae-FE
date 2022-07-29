import { Taste } from '@customTypes/index'
import styled from '@emotion/styled'
import Tag from './Tag'
import { dummyTasteList as tasteList } from '@constants/dummyMenu'
interface Props {
  width?: number
  height?: number
  gap?: number
  backgroundColor?: string
  selectedTasteList: Taste[]
}
const TagContainer = ({
  selectedTasteList,
  width,
  height,
  gap,
  backgroundColor = '#d9d9d9'
}: Props) => {
  const handleClickTag = (clickedTagId: number) => {
    console.log(clickedTagId)
  }
  console.log(selectedTasteList)

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
          height={3.2}
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
  height: number | undefined
  gap: number | undefined
  backgroundColor: string
}>`
  width: ${({ width }) => (width ? `${width}rem` : '100%')};
  height: ${({ height }) => (height ? `${height}rem` : '100%')};
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  padding: 0 0.5rem;
  background-color: ${({ backgroundColor }) => backgroundColor};
  overflow-y: scroll;
  gap: ${({ gap }) => (gap ? `${gap}rem` : '0.4rem')};
  ::-webkit-scrollbar {
    display: none;
  }
`
export default TagContainer
