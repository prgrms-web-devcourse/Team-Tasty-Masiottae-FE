import styled from '@emotion/styled'
import ImageUploader from '@components/ImageUploader'
import { ImageType } from '@customTypes/index'

const CreateMenu = () => {
  const handleImageChange = (newImage: ImageType) => {
    console.log(newImage) // image 받기 성공
  }

  return (
    <FlexContainer>
      <ImageUploader onChange={handleImageChange} />
    </FlexContainer>
  )
}
export default CreateMenu

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
