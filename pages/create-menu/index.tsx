import Tag from '@components/Tag'
import styled from '@emotion/styled'
import TagContainer from '@components/TagContainer'
import { TasteType } from '@customTypes/index'
import { TASTE_LIST } from '@constants/taste'

const CreateMenu = () => {
  let selectedTags: TasteType[] = []
  const handleClick = (clickedTag: TasteType) => {
    if (selectedTags.includes(clickedTag)) {
      selectedTags = selectedTags.filter((tag) => tag !== clickedTag)
    } else {
      selectedTags.push(clickedTag)
    }
  }

  return (
    <FlexContainer>
      <Title>메뉴 등록</Title>
      <ImageBox></ImageBox>
      <FileInput type="file"></FileInput>
      <TagContainer width={30} height={10}>
        {TASTE_LIST.map((taste, idx) => (
          <Tag key={idx} name={taste} height={3.2} onClick={handleClick}></Tag>
        ))}
      </TagContainer>
    </FlexContainer>
  )
}
export default CreateMenu

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h1`
  font-size: 4rem;
  align-self: start;
`

const ImageBox = styled.div`
  width: 30rem;
  height: 30rem;
  background-color: #d9d9d9;
  &:hover {
    cursor: pointer;
  }
`

const FileInput = styled.input`
  visibility: hidden;
`
