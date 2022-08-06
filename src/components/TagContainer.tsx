import styled from '@emotion/styled'
import Tag from './Tag'
import { dummyTasteList } from '@constants/dummyMenu'
import { useTasteList } from '@hooks/queries/useTasteList'

const MAX_TAG = 4
interface Props {
  selectedTasteIdList: number[]
  onChange: (selectedTagList: number[]) => void
  max?: number
  width?: number
  height?: number
  gap?: number
  tagHeight?: number
  backgroundColor?: string
}
const TagContainer = ({
  selectedTasteIdList,
  onChange,
  width,
  height = 20,
  gap = 0.8,
  tagHeight = 3.2,
  backgroundColor = '#ffffff'
}: Props) => {
  const { data: tasteList } = useTasteList()
  const tagIdList = selectedTasteIdList
  const handleClickTag = (clickedTagId: number) => {
    let newTagList = tagIdList
    if (tagIdList.includes(clickedTagId)) {
      newTagList = tagIdList.filter((id) => id !== clickedTagId)
    } else {
      newTagList = [...tagIdList, clickedTagId]
    }
    newTagList = newTagList.slice(0, MAX_TAG)
    onChange(newTagList)
  }

  return (
    <Container
      width={width}
      height={height}
      gap={gap}
      backgroundColor={backgroundColor}
    >
      {dummyTasteList?.map((taste) => (
        <Tag
          key={taste.id}
          id={taste.id}
          name={taste.name}
          color={taste.color}
          height={tagHeight}
          onClick={handleClickTag}
          isClicked={selectedTasteIdList.includes(taste.id) ? true : false}
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
