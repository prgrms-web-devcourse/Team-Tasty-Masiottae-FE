import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import TagContainer from '@components/TagContainer'
import ImageUploader from '@components/ImageUploader'
import Button from '@components/Button'
import { Option } from '@customTypes/index'
import { usePostMenu } from '@hooks/mutations/usePostMenuMutation'
import { InputList } from '@components/create-menu/InputList'
import Spinner from '@components/Spinner'

export interface InputListType {
  franchiseId: number
  title: string
  originalTitle: string
  optionList: Option[]
  expectedPrice: number
  isPriceButtonClicked: boolean
}

const CreateMenu = () => {
  // 필드 값
  const router = useRouter()
  const { mutate, isLoading } = usePostMenu()

  const [file, setFile] = useState<File | null>(null)
  const [franchiseId, setFranchiseId] = useState<number>(0)
  const [title, setTitle] = useState('')
  const [originalTitle, setOriginalTitle] = useState('')
  const [optionList, setOptionList] = useState<Option[]>([])
  const [tasteIdList, setTasteIdList] = useState<number[]>([])
  const [expectedPrice, setExpectedPrice] = useState(0)
  const [isPriceButtonClicked, setIsPriceButtonClicked] = useState(false)

  const checkButtonDisabled = () => {
    return !(
      franchiseId &&
      title &&
      originalTitle &&
      optionList.filter((option) => option.name && option.description).length &&
      tasteIdList.length &&
      (isPriceButtonClicked || expectedPrice > 0)
    )
  }

  const handleImageChange = (file: File | null) => {
    setFile(file)
  }

  const handleTagListChange = (tagIdList: number[]) => {
    setTasteIdList(tagIdList)
  }

  const handleEditSubmit = async () => {
    setOptionList(
      optionList.filter((option) => option.name && option.description)
    )

    const data = {
      franchiseId,
      title,
      content: '',
      originalTitle,
      expectedPrice,
      optionList,
      tasteIdList
    }
    mutate(
      { image: file, data },
      {
        onSuccess: (data) => {
          router.replace(`/detail/${data.menuId}`)
        }
      }
    )
  }
  const handleInputChange = ({
    franchiseId,
    title,
    originalTitle,
    optionList,
    expectedPrice,
    isPriceButtonClicked
  }: InputListType) => {
    setFranchiseId(franchiseId)
    setTitle(title)
    setOriginalTitle(originalTitle)
    setOptionList(optionList)
    setExpectedPrice(expectedPrice)
    setIsPriceButtonClicked(isPriceButtonClicked)
  }

  return (
    <>
      <FlexContainer>
        {isLoading ? <Spinner /> : ''}
        <ImageUploaderWrapper>
          <ImageUploader isDeletable={true} onChange={handleImageChange} />
        </ImageUploaderWrapper>
        <InputList
          franchiseId={franchiseId}
          title={title}
          originalTitle={originalTitle}
          optionList={optionList}
          expectedPrice={expectedPrice}
          isPriceButtonClicked={isPriceButtonClicked}
          onChange={handleInputChange}
        ></InputList>
        <SubTitle>맛</SubTitle>
        <TagContainer
          selectedTasteIdList={tasteIdList}
          onChange={handleTagListChange}
        />
        <SubmitButton
          color={'#fff'}
          backgroundColor={'#000'}
          disabled={
            !(
              franchiseId &&
              title &&
              originalTitle &&
              optionList.filter((option) => option.name && option.description)
                .length &&
              tasteIdList.length &&
              (isPriceButtonClicked || expectedPrice > 0)
            )
          }
          onClick={handleEditSubmit}
        >
          등록 하기
        </SubmitButton>
      </FlexContainer>
    </>
  )
}

const Flex = styled.div`
  display: flex;
`

const FlexContainer = styled(Flex)`
  flex-direction: column;
  align-items: center;
`

const ImageUploaderWrapper = styled.div`
  width: calc(100% + 40px);
`

const SubTitle = styled.h3`
  font-size: 2rem;
  align-self: start;
`

const SubmitButton = styled(Button)`
  font-weight: 700;
  font-size: 2rem;
`

export default CreateMenu
