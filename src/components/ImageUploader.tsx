import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { ImageType } from '@customTypes/index'
import { TbCameraPlus } from 'react-icons/tb'

const FILE_TYPE = 'image/gif, image/jpeg, image/png'
const FILE_INPUT_NAME = 'image-input'
const FILE_REGEX = /\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i
interface Props {
  size?: number
  shape?: 'square' | 'circle'
  value?: string | null
  onChange: (file: File) => void
}

const ImageUploader = ({
  size,
  shape = 'square',
  value = null,
  onChange
}: Props) => {
  const [image, setImage] = useState<ImageType>(value)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    setImage(value)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    const file = e.target.files ? e.target.files[0] : null

    if (!file?.name.match(FILE_REGEX)) {
      setIsError(true)
      return
    }
    setIsError(false)
    reader.readAsDataURL(file)
    reader.onload = () => {
      setImage(reader.result)
      onChange(file)
    }
  }

  return (
    <>
      <ImageBox
        htmlFor={FILE_INPUT_NAME}
        size={size}
        shape={shape}
        image={image}
      >
        <StyledIcon selected={Boolean(image)} />
      </ImageBox>
      {isError ? (
        <ErrorMessage>확장자는 jpg, png, jpeg 만 가능해요!</ErrorMessage>
      ) : (
        ''
      )}
      <FileInput
        id={FILE_INPUT_NAME}
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
  background-color: #f7bec1;
  background-image: ${({ image }) => (image ? `url(${image})` : null)};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: ${({ shape }) => (shape === 'circle' ? '50%' : '0')};
  &:hover {
    cursor: pointer;
  }
`

const StyledIcon = styled(TbCameraPlus)<{ selected: boolean }>`
  width: 10rem;
  height: 10rem;
  color: white;
  visibility: ${({ selected }) => (selected ? 'hidden' : 'visible')};
`

const ErrorMessage = styled.div`
  font-size: 1.4rem;
  color: red;
`

const FileInput = styled.input`
  visibility: hidden;
`

export default ImageUploader
