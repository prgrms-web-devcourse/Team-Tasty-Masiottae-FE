import styled from '@emotion/styled'

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
      <Title>메뉴 수정</Title>
      <ImageBox htmlFor="image-input"></ImageBox>
      <Input placeholder="메뉴 명"></Input>
      <Input placeholder="기본 메뉴 명"></Input>
      <FileInput id="image-input" type="file"></FileInput>
      <TagContainer></TagContainer>
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

const ImageBox = styled.label`
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

const Input = styled.input`
  width: 80%;
  height: 3.2rem;
  border: 2px solid black;
`
