import styled from '@emotion/styled'
import React, { useState } from 'react'
import { ImageType } from '@customTypes/index'
import { BsPlusLg } from 'react-icons/bs'

const FILE_TYPE = 'image/gif, image/jpeg, image/png'
interface Props {
  size?: number
  shape?: 'square' | 'circle'
  value?: string | null
  onChange: (image: ImageType) => void
}

const ImageUploader = ({
  size,
  shape = 'square',
  value = null,
  onChange
}: Props) => {
  const [image, setImage] = useState<ImageType>(value)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    const file = e.target.files ? e.target.files[0] : null
    if (file) {
      reader.readAsDataURL(file)
      reader.onload = () => {
        setImage(reader.result)
        onChange(reader.result)
      }
    }
  }

  return (
    <>
      <ImageBox htmlFor="image-input" size={size} shape={shape} image={image}>
        <StyledPlus loaded={image ? +true : +false} />
      </ImageBox>
      <FileInput
        id="image-input"
        type="file"
        onChange={handleChange}
        accept={FILE_TYPE}
      />
    </>
  )
}

const ImageBox = styled.label<{
  size: number | undefined
  shape: 'square' | 'circle'
  image: ImageType
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ size }) => (size ? `${size}rem` : '100%')};
  height: ${({ size }) => `${size}rem`};
  padding-top: ${({ size }) => (size ? `0` : 'calc(50% - 5rem)')};
  padding-bottom: ${({ size }) => (size ? `0` : 'calc(50% - 5rem)')};
  background-color: #d9d9d9;
  background-image: ${({ image }) => (image ? `url(${image})` : null)};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: ${({ shape }) => (shape === 'circle' ? '50%' : '0')};
  &:hover {
    cursor: pointer;
  }
`

const StyledPlus = styled(BsPlusLg)<{ loaded: number }>`
  width: 10rem;
  height: 10rem;
  visibility: ${({ loaded }) => (loaded ? 'hidden' : 'visible')};
`

const FileInput = styled.input`
  visibility: hidden;
`

export default ImageUploader
