import styled from '@emotion/styled'
import { BsPlusLg } from 'react-icons/bs'

const ImageUploader = () => {
  return (
    <>
      <ImageBox htmlFor="image-loader"></ImageBox>
      <StyledPlus />
      <FileInput type="file" name="image-loader"></FileInput>
    </>
  )
}

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
const StyledPlus = styled(BsPlusLg)`
  width: 5rem;
  height: 5rem;
  position: absolute;
  top: 9rem;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
`

export default ImageUploader
