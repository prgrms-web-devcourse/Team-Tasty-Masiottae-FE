import Tag from '@components/Tag'
import styled from '@emotion/styled'

const TASTE_TAG = [
  '차가운',
  '뜨거운',
  '달콤한',
  '매콤한',
  '새콤한',
  '쌉싸름한',
  '짭짜름한'
]

const CreateMenu = () => {
  let selectedTags: string[] = []
  const handleClick = (clickedTag: string) => {
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
      <TagContainer>
        {TASTE_TAG.map((taste, idx) => (
          <Tag key={idx} name={taste} size={3.2} onClick={handleClick}></Tag>
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

const TagContainer = styled.div`
  width: 80%;
  height: 10rem;
  display: flex;
  flex-wrap: wrap;
  padding: 0 0.5rem;
  background-color: #d9d9d9;
  overflow-y: scroll;
  gap: 0.5rem;
  ::-webkit-scrollbar {
    display: none;
  }
`
