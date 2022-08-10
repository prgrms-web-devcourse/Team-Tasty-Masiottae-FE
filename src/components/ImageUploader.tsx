import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { ImageType } from '@customTypes/index'
import { TbCameraPlus } from 'react-icons/tb'
import { TiDelete } from 'react-icons/ti'

const FILE_TYPE = 'image/gif, image/jpeg, image/png'
const FILE_INPUT_NAME = 'image-input'
const FILE_REGEX = /\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i
interface Props {
  size?: number
  shape?: 'square' | 'circle'
  value?: string | null
  isReset?: boolean
  isDeletable?: boolean
  onChange: (file: File | null) => void
}

const ImageUploader = ({
  size,
  shape = 'square',
  value = null,
  isReset = true,
  isDeletable = false,
  onChange
}: Props) => {
  const [image, setImage] = useState<ImageType>(value)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    isReset && setImage(value)
  }, [isReset, value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    const file = e.target.files ? e.target.files[0] : null
    console.log(file)
    if (!file) {
      return
    }
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
    e.target.value = ''
  }

  const handleDeleteButtonClick = (
    e: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    e.preventDefault()
    setImage(null)
    onChange(null)
  }

  return (
    <>
      <ImageBox
        htmlFor={FILE_INPUT_NAME}
        size={size}
        shape={shape}
        image={image}
      >
        {isDeletable && image ? (
          <DeleteIcon onClick={handleDeleteButtonClick} />
        ) : (
          ''
        )}
        <StyledPlus selected={Boolean(image)} />
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
  position: relative;
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

const StyledPlus = styled(TbCameraPlus)<{ selected: boolean }>`
  width: 10rem;
  height: 10rem;
  color: white;
  visibility: ${({ selected }) => (selected ? 'hidden' : 'visible')};
`

const DeleteIcon = styled(TiDelete)`
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  width: 5rem;
  height: 5rem;
  padding: 0.5rem;
`

const ErrorMessage = styled.div`
  font-size: 1.4rem;
  color: red;
`

const FileInput = styled.input`
  visibility: hidden;
`

export default ImageUploader
