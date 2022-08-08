import styled from '@emotion/styled'
import InputMessage from '@components/InputMessage'
import Input from '@components/Input'
import Button from '@components/Button'
import { TiDelete } from 'react-icons/ti'
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
  isPriceButtonClicked: boolean
}

interface Prop {
  franchiseId: number
  title: string
  originalTitle: string
  optionList: Option[]
  expectedPrice: number
  isPriceButtonClicked: boolean
  onChange: (inputList: InputListType) => void
}

export const InputList = ({
  franchiseId,
  title,
  originalTitle,
  optionList,
  expectedPrice,
  isPriceButtonClicked,
  onChange
}: Prop) => {
  const handleOnChange = () => {
    onChange({
      franchiseId,
      title,
      originalTitle,
      optionList,
      expectedPrice,
      isPriceButtonClicked
    })
  }

  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    title = e.currentTarget.value
    handleOnChange()
  }

  const handleOriginalTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    originalTitle = e.currentTarget.value
    handleOnChange()
  }

  const handlePriceChange = (e: React.FormEvent<HTMLInputElement>) => {
    const priceRegExp = /[^0-9]/g
    expectedPrice = Number(e.currentTarget.value.replace(priceRegExp, ''))
    handleOnChange()
  }

  const handleOptionAddBtnClick = () => {
    if (optionList.length > MAX_OPTION) {
      return
    }
    const newOptionList = [...optionList, { name: '', description: '' }]
    optionList = newOptionList
    handleOnChange()
  }

  const handleOptionDelBtnClick = (deletedIdx: number) => {
    const newOptionList = optionList.filter((_, idx) => deletedIdx !== idx)
    optionList = newOptionList
    handleOnChange()
  }

  const handleOptionNameChange = (
    e: React.FormEvent<HTMLInputElement>,
    idx: number
  ) => {
    const newOptionName = e.currentTarget.value
    optionList[idx] = {
      name: newOptionName,
      description: optionList[idx].description
    }
    const newOptionList = [...optionList]
    optionList = newOptionList
    handleOnChange()
  }

  const handleOptionDescriptionChange = (
    e: React.FormEvent<HTMLInputElement>,
    idx: number
  ) => {
    const newOptionDescription = e.currentTarget.value
    optionList[idx] = {
      name: optionList[idx].name,
      description: newOptionDescription
    }
    const newOptionList = [...optionList]
    optionList = newOptionList
    handleOnChange()
  }

  const handleFranchiseChange = (e: React.FormEvent<HTMLSelectElement>) => {
    franchiseId = Number(e.currentTarget.value)
    handleOnChange()
  }

  const handlePriceButtonClick = () => {
    expectedPrice = 0
    isPriceButtonClicked = !isPriceButtonClicked
    handleOnChange()
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
          value={
            expectedPrice
              ? String(expectedPrice)
              : isPriceButtonClicked
              ? '미정'
              : '0'
          }
          placeholder={PLACEHOLDER_EXPECTED_PRICE}
          onChange={handlePriceChange}
          isDisabled={isPriceButtonClicked}
        />
        <PriceDefaultButton
          width={6.4}
          height={4}
          onClick={handlePriceButtonClick}
          isClicked={isPriceButtonClicked}
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
