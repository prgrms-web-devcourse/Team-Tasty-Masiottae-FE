import styled from '@emotion/styled'
import {
  Input,
  InputMessage,
  Button,
  FranchiseSelect
} from '@components/common'
import { TiDelete } from 'react-icons/ti'
import { BsCheckLg } from 'react-icons/bs'
import { Option } from '@interfaces'

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
  ERROR_MESSAGE_REQUIRED_FRANCHISE,
  ERROR_MESSAGE_REQUIRED_TITLE,
  ERROR_MESSAGE_REQUIRED_ORIGINAL_TITLE,
  ERROR_MESSAGE_REQUIRED_OPTION,
  ERROR_MESSAGE_REQUIRED_OPTION_TEXT
} from '@constants/menuConstant'
import { useState } from 'react'

interface InputList {
  franchiseId: number
  title: string
  originalTitle: string
  optionList: Option[]
  expectedPrice: number
  isPriceButtonClicked: boolean
}

interface Init {
  franchise: boolean
  title: boolean
  originalTitle: boolean
  option: boolean
  expectedPrice: boolean
  optionList: boolean[]
}

interface Props {
  franchiseId: number
  title: string
  originalTitle: string
  optionList: Option[]
  expectedPrice: number
  isPriceButtonClicked: boolean
  onChange: (inputList: InputList) => void
}

export const InputList = ({
  franchiseId,
  title,
  originalTitle,
  optionList,
  expectedPrice,
  isPriceButtonClicked,
  onChange
}: Props) => {
  const [isInit, setIsInit] = useState<Init>({
    franchise: true,
    title: true,
    originalTitle: true,
    option: true,
    expectedPrice: true,
    optionList: []
  })

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
    setIsInit((isInit) => {
      return { ...isInit, title: false }
    })
    handleOnChange()
  }

  const handleOriginalTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    originalTitle = e.currentTarget.value
    setIsInit((isInit) => {
      return { ...isInit, originalTitle: false }
    })
    handleOnChange()
  }

  const handlePriceChange = (e: React.FormEvent<HTMLInputElement>) => {
    const priceRegExp = /[^0-9]/g
    expectedPrice = Number(
      e.currentTarget.value.replace(priceRegExp, '').slice(0, 7)
    )
    handleOnChange()
  }

  const handleOptionAddBtnClick = () => {
    if (optionList.length > MAX_OPTION) {
      return
    }
    const newOptionList = [...optionList, { name: '', description: '' }]
    optionList = newOptionList
    setIsInit((isInit) => {
      return { ...isInit, optionList: [...isInit.optionList, true] }
    })
    handleOnChange()
  }

  const handleOptionDelBtnClick = (deletedIdx: number) => {
    const newOptionList = optionList.filter((_, idx) => deletedIdx !== idx)
    setIsInit((isInit) => {
      return {
        ...isInit,
        optionList: isInit.optionList.filter((_, idx) => deletedIdx !== idx)
      }
    })
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
    setIsInit((isInit) => {
      return {
        ...isInit,
        optionList: isInit.optionList.map((init, index) =>
          idx === index || init === false ? false : true
        )
      }
    })
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
    setIsInit((isInit) => {
      return {
        ...isInit,
        optionList: isInit.optionList.map((init, index) =>
          idx === index || init === false ? false : true
        )
      }
    })
    handleOnChange()
  }

  const handleFranchiseChange = (e: React.FormEvent<HTMLSelectElement>) => {
    franchiseId = Number(e.currentTarget.value)
    handleOnChange()
    setIsInit((isInit) => {
      return { ...isInit, franchise: false }
    })
  }

  const handlePriceButtonClick = () => {
    expectedPrice = 0
    isPriceButtonClicked = !isPriceButtonClicked
    handleOnChange()
  }

  return (
    <InputWrapper>
      <InputName>프랜차이즈</InputName>
      <FranchiseSelect
        onChange={handleFranchiseChange}
        defaultValue={franchiseId}
      />
      <InputMessage
        isValid={Boolean(franchiseId) || isInit.franchise}
        errorMessage={ERROR_MESSAGE_REQUIRED_FRANCHISE}
      ></InputMessage>
      <InputName>커스텀 메뉴 이름</InputName>
      <TitleInput
        height={4.8}
        type="text"
        name={NAME_TITLE}
        value={title}
        placeholder={PLACEHOLDER_TITLE}
        onChange={handleTitleChange}
        isValid={Boolean(title) || isInit.title}
      />
      <InputMessage
        isValid={Boolean(title) || isInit.title}
        errorMessage={ERROR_MESSAGE_REQUIRED_TITLE}
      ></InputMessage>
      <InputName>기본 메뉴 이름</InputName>
      <TitleInput
        height={4.8}
        type="text"
        name={NAME_ORIGINAL_TITLE}
        value={originalTitle}
        placeholder={PLACEHOLDER_ORIGINAL_TITLE}
        onChange={handleOriginalTitleChange}
        isValid={Boolean(originalTitle) || isInit.originalTitle}
      />
      <InputMessage
        isValid={Boolean(originalTitle) || isInit.originalTitle}
        errorMessage={ERROR_MESSAGE_REQUIRED_ORIGINAL_TITLE}
      ></InputMessage>
      <OptionButtonWrapper>
        <OptionButton
          width={10}
          height={4}
          color={'#fff'}
          backgroundColor={'#000'}
          onClick={handleOptionAddBtnClick}
        >
          옵션 추가
        </OptionButton>
        <InputMessage
          isValid={Boolean(optionList.length) || isInit.option}
          errorMessage={ERROR_MESSAGE_REQUIRED_OPTION}
        ></InputMessage>
      </OptionButtonWrapper>
      {optionList.map((option, idx) => (
        <div key={idx}>
          <OptionWrapper key={idx}>
            <OptionName
              height={4.8}
              type="text"
              name={NAME_OPTION_NAME}
              value={option.name}
              required={true}
              placeholder={PLACEHOLDER_OPTION_NAME}
              onChange={(e) => {
                handleOptionNameChange(e, idx)
              }}
              isValid={option.name ? true : false || isInit.optionList[idx]}
            />
            <OptionDescription
              height={4.8}
              type="text"
              name={NAME_OPTION_DESCRIPTION}
              value={option.description}
              required={true}
              placeholder={PLACEHOLDER_OPTION_DESCRIPTION}
              onChange={(e) => {
                handleOptionDescriptionChange(e, idx)
              }}
              isValid={
                option.description ? true : false || isInit.optionList[idx]
              }
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
            isValid={
              option.name && option.description
                ? true
                : false || isInit.optionList[idx]
            }
            errorMessage={ERROR_MESSAGE_REQUIRED_OPTION_TEXT}
          ></InputMessage>
        </div>
      ))}
      <PriceWrapper>
        <PriceTitle>가격</PriceTitle>
        <PriceInput
          width={20}
          height={4.8}
          type="text"
          name={NAME_EXPECTED_PRICE}
          value={
            expectedPrice
              ? expectedPrice.toLocaleString('ko-KR')
              : isPriceButtonClicked
              ? '미정'
              : '0'
          }
          placeholder={PLACEHOLDER_EXPECTED_PRICE}
          onChange={handlePriceChange}
          isDisabled={isPriceButtonClicked}
        />
        <PriceDefaultButton
          width={8}
          height={4.6}
          onClick={handlePriceButtonClick}
          isClicked={isPriceButtonClicked}
        >
          모름 {isPriceButtonClicked ? <CheckIcon /> : ''}
        </PriceDefaultButton>
      </PriceWrapper>
    </InputWrapper>
  )
}

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const OptionButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`
const DeleteIcon = styled(TiDelete)`
  width: 3rem;
  height: 3rem;
`
const InputName = styled.div`
  font-size: 2rem;
  font-weight: 800;
  min-width: 2rem;
  padding-bottom: 0.8rem;
  padding-top: 1.6rem;
`
const TitleInput = styled(Input)`
  font-size: 1.6rem;
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
  font-size: 1.6rem;
  width: 30%;
`
const OptionDescription = styled(Input)`
  font-size: 1.6rem;
  width: 50%;
  flex-grow: 1;
  flex-shrink: 1;
`

const PriceWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  padding: 0.4rem 0;
`
const PriceTitle = styled.div`
  font-size: 2rem;
  font-weight: 800;
  width: 15rem;

  padding-bottom: 0.8rem;
  padding-top: 1.6rem;
`

const PriceDefaultButton = styled(Button)<{ isClicked: boolean }>`
  background-color: ${({ theme, isClicked }) =>
    isClicked ? theme.color.mainBlack : theme.color.mainWhite};
  color: ${({ theme, isClicked }) =>
    isClicked ? theme.color.mainWhite : theme.color.mainBlack};
  border: 0.2rem solid black;
`

const PriceInput = styled(Input)`
  font-size: 1.6rem;
  flex-grow: 1;
`

const CheckIcon = styled(BsCheckLg)`
  padding-left: 0.4rem;
  padding-top: 0.2rem;
  width: 1.6rem;
  height: 1.6rem;
`
