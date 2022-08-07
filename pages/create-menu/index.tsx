import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { TiDelete } from 'react-icons/ti'
import Input from '@components/Input'
import TagContainer from '@components/TagContainer'
import ImageUploader from '@components/ImageUploader'
import Button from '@components/Button'
import FranchiseSelect from '@components/FranchiseSelect'
import { Option } from '@customTypes/index'
import { usePostMenu } from '@hooks/mutations/usePostMenuMutation'
import InputMessage from '@components/InputMessage'

import {
  MAX_OPTION,
  NAME_TITLE,
  NAME_ORIGINAL_TITLE,
  NAME_OPTION_NAME,
  NAME_OPTION_DESCRIPTION,
  NAME_EXPECTED_PRICE,
  PLACEHOLDER_TITLE,
  PLACEHOLDER_ORIGINAL_TITLE,
  PLACEHOLDER_OPTION_NAME,
  PLACEHOLDER_OPTION_DESCRIPTION,
  PLACEHOLDER_EXPECTED_PRICE,
  ERROR_MESSAGE_REQUIRED_TITLE,
  ERROR_MESSAGE_REQUIRED_ORIGINAL_TITLE,
  ERROR_MESSAGE_REQUIRED_OPTION
} from '@constants/menuConstant'

const CreateMenu = () => {
  // 필드 값
  const router = useRouter()
  const { mutate } = usePostMenu()
  const [file, setFile] = useState<File | null>(null)
  const [franchiseId, setFranchiseId] = useState(1)
  const [title, setTitle] = useState('')
  const [originalTitle, setOriginalTitle] = useState('')
  const [optionList, setOptionList] = useState<Option[]>([])
  const [tasteIdList, setTasteIdList] = useState<number[]>([])
  const [expectedPrice, setExpectedPrice] = useState(0)

  // valid 값
  const [isPriceBtnClicked, setIsPriceBtnClicked] = useState(false)
  // onChange handler
  const handleImageChange = (file: File) => {
    setFile(file)
  }

  const handleFranchiseChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setFranchiseId(Number(e.currentTarget.value))
  }

  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const title = e.currentTarget.value
    setTitle(title)
  }

  const handleOriginalTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const originalTitle = e.currentTarget.value
    setOriginalTitle(originalTitle)
  }

  const handlePriceChange = (e: React.FormEvent<HTMLInputElement>) => {
    const priceRegExp = /[^0-9]/g
    const price = e.currentTarget.value.replace(priceRegExp, '')
    setExpectedPrice(Number(price))
  }

  const handleOptionAddBtnClick = () => {
    setOptionList((optionList) => {
      if (optionList.length > MAX_OPTION) {
        return optionList
      }
      const newOptionList = [...optionList, { name: '', description: '' }]
      return newOptionList
    })
  }

  const handleOptionDelBtnClick = (deletedIdx: number) => {
    setOptionList((optionList) => {
      const newOptionList = optionList.filter((_, idx) => deletedIdx !== idx)
      return newOptionList
    })
  }

  const handleOptionNameChange = (
    e: React.FormEvent<HTMLInputElement>,
    idx: number
  ) => {
    const newOptionName = e.currentTarget.value
    setOptionList((optionList) => {
      optionList[idx] = {
        name: newOptionName,
        description: optionList[idx].description
      }
      const newOptionList = [...optionList]
      return newOptionList
    })
  }

  const handleOptionDescriptionChange = (
    e: React.FormEvent<HTMLInputElement>,
    idx: number
  ) => {
    const newOptionDescription = e.currentTarget.value
    setOptionList((optionList) => {
      optionList[idx] = {
        name: optionList[idx].name,
        description: newOptionDescription
      }
      const newOptionList = [...optionList]

      return newOptionList
    })
  }

  const handleTagListChange = (tagIdList: number[]) => {
    setTasteIdList(tagIdList)
    console.log(Boolean(tagIdList.length))
  }

  const handlePriceButtonClick = () => {
    setIsPriceBtnClicked((isBtnClicked) => !isBtnClicked)
  }

  // form data 전송
  const handleEditSubmit = async () => {
    setOptionList(
      optionList.filter((option) => option.name && option.description)
    )

    const data = {
      userId: 1,
      franchiseId: franchiseId,
      title: title,
      content: '',
      originalTitle: originalTitle,
      expectedPrice: expectedPrice,
      optionList: optionList,
      tasteIdList: tasteIdList
    }
    mutate(
      { image: file, data: data },
      {
        onSuccess: (data) => {
          router.replace(`/detail/${data.menuId}`)
        }
      }
    )
  }
  return (
    <FlexContainer>
      <ImageUploaderWrapper>
        <ImageUploader onChange={handleImageChange} />
      </ImageUploaderWrapper>
      <InputWrapper>
        <InputName>프랜차이즈</InputName>
        <FranchiseSelect onChange={handleFranchiseChange} />
        <InputName>커스텀 메뉴 이름</InputName>
        <Input
          height={2.4}
          type="text"
          name={NAME_TITLE}
          value={title}
          placeholder={PLACEHOLDER_TITLE}
          onChange={handleTitleChange}
          isValid={Boolean(title)}
        />
        <InputMessage
          isValid={Boolean(title)}
          errorMessage={ERROR_MESSAGE_REQUIRED_TITLE}
        ></InputMessage>
        <InputName>기본 메뉴 이름</InputName>
        <Input
          height={2.4}
          type="text"
          name={NAME_ORIGINAL_TITLE}
          value={originalTitle}
          placeholder={PLACEHOLDER_ORIGINAL_TITLE}
          onChange={handleOriginalTitleChange}
          isValid={Boolean(originalTitle)}
        />
        <InputMessage
          isValid={Boolean(originalTitle)}
          errorMessage={ERROR_MESSAGE_REQUIRED_ORIGINAL_TITLE}
        ></InputMessage>
        <OptionButton
          width={10}
          height={4}
          color={'#fff'}
          backgroundColor={'#000'}
          onClick={handleOptionAddBtnClick}
        >
          옵션 추가
        </OptionButton>
        {optionList.map((option, idx) => (
          <div key={idx}>
            <OptionWrapper key={idx}>
              <OptionName
                height={2.4}
                type="text"
                name={NAME_OPTION_NAME}
                value={option.name}
                required={true}
                placeholder={PLACEHOLDER_OPTION_NAME}
                onChange={(e) => {
                  handleOptionNameChange(e, idx)
                }}
                isValid={option.name ? true : false}
              />
              <OptionDescription
                height={2.4}
                type="text"
                name={NAME_OPTION_DESCRIPTION}
                value={option.description}
                required={true}
                placeholder={PLACEHOLDER_OPTION_DESCRIPTION}
                onChange={(e) => {
                  handleOptionDescriptionChange(e, idx)
                }}
                isValid={option.description ? true : false}
              />
              <Button
                width={6}
                height={4}
                backgroundColor={'#fff'}
                onClick={() => handleOptionDelBtnClick(idx)}
              >
                <DeleteIcon />
              </Button>
            </OptionWrapper>
            <InputMessage
              isValid={option.name && option.description ? true : false}
              errorMessage={ERROR_MESSAGE_REQUIRED_OPTION}
            ></InputMessage>
          </div>
        ))}
        <OptionWrapper>
          <InputName>가격</InputName>
          <PriceInput
            width={20}
            height={2.4}
            type="text"
            name={NAME_EXPECTED_PRICE}
            value={expectedPrice.toString()}
            placeholder={PLACEHOLDER_EXPECTED_PRICE}
            onChange={handlePriceChange}
            isDisabled={isPriceBtnClicked}
          />
          <PriceDefaultButton
            width={6.4}
            height={4}
            onClick={handlePriceButtonClick}
            isClicked={isPriceBtnClicked}
          >
            모름
          </PriceDefaultButton>
        </OptionWrapper>
      </InputWrapper>
      <SubTitle>맛</SubTitle>
      <TagContainer
        selectedTasteIdList={tasteIdList}
        onChange={handleTagListChange}
      />
      <Button
        color={'#fff'}
        backgroundColor={'#000'}
        disabled={
          !(
            title &&
            originalTitle &&
            optionList.filter((option) => option.name && option.description)
              .length &&
            tasteIdList.length &&
            (isPriceBtnClicked || expectedPrice > 0)
          )
        }
        onClick={handleEditSubmit}
      >
        메뉴 추가
      </Button>
    </FlexContainer>
  )
}

const Flex = styled.div`
  display: flex;
`

const FlexContainer = styled(Flex)`
  flex-direction: column;
  align-items: center;
`

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const DeleteIcon = styled(TiDelete)`
  width: 3rem;
  height: 3rem;
`
const InputName = styled.div`
  font-size: 2rem;
  font-weight: 800;
  min-width: 10rem;
  padding: 0.8rem 0;
`
const OptionButton = styled(Button)`
  margin: 0.8rem 0;
`

const ImageUploaderWrapper = styled.div`
  width: calc(100% + 40px);
`

const OptionWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  padding: 0.4rem 0;
`

const OptionName = styled(Input)`
  width: 30%;
`
const OptionDescription = styled(Input)`
  width: 50%;
  flex-grow: 1;
  flex-shrink: 1;
`

const PriceDefaultButton = styled(Button)<{ isClicked: boolean }>`
  font-weight: 600;
  background-color: ${({ isClicked }) => (isClicked ? '#000' : '#fff')};
  color: ${({ isClicked }) => (isClicked ? '#fff' : '#000')};
  border: 2px solid black;
`

const PriceInput = styled(Input)`
  width: 70%;
  align-self: end;
`

const SubTitle = styled.h3`
  font-size: 2rem;
  align-self: start;
`

export default CreateMenu
