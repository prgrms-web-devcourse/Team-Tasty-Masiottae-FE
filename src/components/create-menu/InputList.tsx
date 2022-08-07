import styled from '@emotion/styled'
import InputMessage from '@components/InputMessage'
import Input from '@components/Input'
import Button from '@components/Button'
import { TiDelete } from 'react-icons/ti'
import { useState, useEffect } from 'react'
import { Option } from '@interfaces'
import FranchiseSelect from '@components/FranchiseSelect'

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

export interface InputListType {
  franchiseId: number
  title: string
  originalTitle: string
  optionList: Option[]
  expectedPrice: number
}

interface Prop {
  franchiseId?: number
  title?: string
  originalTitle?: string
  optionList?: Option[]
  expectedPrice?: number
  onChange: (inputList: InputListType, isValid: boolean) => void
}

export const InputList = ({
  franchiseId: defaultFranchiseId,
  title: defaultTitle,
  originalTitle: defaultOriginalTitle,
  optionList: defaultOptionList,
  expectedPrice: defaultPrice,
  onChange
}: Prop) => {
  useEffect(() => {
    setFranchiseId(defaultFranchiseId ? defaultFranchiseId : 1)
    setTitle(defaultTitle ? defaultTitle : '')
    setOriginalTitle(defaultOriginalTitle ? defaultOriginalTitle : '')
    setOptionList(defaultOptionList ? defaultOptionList : [])
    setExpectedPrice(defaultPrice ? defaultPrice : 0)
  }, [
    defaultFranchiseId,
    defaultTitle,
    defaultOriginalTitle,
    defaultOptionList,
    defaultPrice
  ])

  const [franchiseId, setFranchiseId] = useState(defaultFranchiseId ?? 1)
  const [title, setTitle] = useState(defaultTitle ?? '')
  const [originalTitle, setOriginalTitle] = useState(defaultOriginalTitle ?? '')
  const [optionList, setOptionList] = useState<Option[]>(
    defaultOptionList ?? []
  )
  const [expectedPrice, setExpectedPrice] = useState(defaultPrice ?? 0)
  const [isPriceBtnClicked, setIsPriceBtnClicked] = useState(false)

  onChange(
    {
      franchiseId,
      title,
      originalTitle,
      optionList,
      expectedPrice
    },
    Boolean(
      franchiseId &&
        title &&
        originalTitle &&
        optionList.filter((option) => option.name && option.description)
          .length &&
        expectedPrice
    )
  )

  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value)
    const title = e.currentTarget.value
    setTitle(title)
  }

  const handleOriginalTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const originalTitle = e.currentTarget.value
    console.log(originalTitle)
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

  const handleFranchiseChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setFranchiseId(Number(e.currentTarget.value))
  }

  const handlePriceButtonClick = () => {
    setIsPriceBtnClicked((isBtnClicked) => !isBtnClicked)
  }

  return (
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
          value={String(expectedPrice)}
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
  )
}

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
