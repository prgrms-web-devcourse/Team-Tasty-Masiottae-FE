import Tag from '@components/Tag'
import styled from '@emotion/styled'
<<<<<<< HEAD
import TagContainer from '@components/TagContainer'
import { TasteType } from '@customTypes/index'
import { TASTE_LIST } from '@constants/taste'
=======
>>>>>>> 6221c52edc203a7d1843da4cdb06fac96f77f401

const CreateMenu = () => {
  return (
    <FlexContainer>
      <Title>메뉴 등록</Title>
      <ImageBox></ImageBox>
      <FileInput type="file"></FileInput>
<<<<<<< HEAD
      <TagContainer width={30} height={10}>
        {TASTE_LIST.map((taste, idx) => (
          <Tag key={idx} name={taste} height={3.2} onClick={handleClick}></Tag>
        ))}
      </TagContainer>
=======
>>>>>>> 6221c52edc203a7d1843da4cdb06fac96f77f401
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
