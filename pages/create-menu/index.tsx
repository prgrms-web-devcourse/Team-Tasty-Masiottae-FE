import Tag from '@components/Tag'
import styled from '@emotion/styled'

const CreateMenu = () => {
  return (
    <FlexContainer>
      <Title>메뉴 등록</Title>
      <ImageBox></ImageBox>
      <FileInput type="file"></FileInput>
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
