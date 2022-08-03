import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Input from '@components/Input'
import TagContainer from '@components/TagContainer'
import ImageUploader from '@components/ImageUploader'
import Button from '@components/Button'
import { ImageType, Option, Taste } from '@customTypes/index'
import { dummyFranchiseList, dummyMenu } from '@constants/dummyMenu'

const MIN_OPTION = 1
const MAX_OPTION = 20

const NAME_SELECT = 'brand'
const NAME_TITLE = 'title'
const NAME_ORIGINAL_TITLE = 'original-title'
const NAME_OPTION_NAME = 'option-name'
const NAME_OPTION_DESCRIPTION = 'option-description'
const NAME_EXPECTED_PRICE = 'price'

const PLACEHOLDER_TITLE = '커스텀 메뉴의 제목을 지어주세요'
const PLACEHOLDER_ORIGINAL_TITLE = '기본이 되는 메뉴의 제목을 적어주세요'
const PLACEHOLDER_OPTION_NAME = '옵션 명'
const PLACEHOLDER_OPTION_DESCRIPTION = '옵션 단위, 또는 설명'
const PLACEHOLDER_EXPECTED_PRICE = '예상되는 최종 가격을 입력해주세요'

const EditMenu = () => {
  // 필드 값
  const [image, setImage] = useState<ImageType>(dummyMenu.image)
  const [franchiseId, setFranchiseId] = useState(dummyMenu.franchise.id)
  const [title, setTitle] = useState(dummyMenu.title)
  const [originalTitle, setOriginalTitle] = useState(dummyMenu.originalTitle)
  const [optionList, setOptionList] = useState<Option[]>(dummyMenu.options)
  const [tasteIdList, setTasteIdList] = useState<number[]>(
    dummyMenu.tastes.map((taste) => taste.id)
  )
  const [expectedPrice, setExpectedPrice] = useState(dummyMenu.expectedPrice)

  // valid 값
  const [isTitleValid, setTitleValid] = useState(true)
  const [isOriginalTitleValid, setOriginalTitleValid] = useState(true)
  // onChange handler
  const handleImageChange = (image: ImageType) => {
    setImage(image)
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
  }

  const requiredInputCheck = (input: string) => {
    return input ? true : false
  }

  // input onBlur handler
  const handleTitleBlur = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value
    setTitleValid(requiredInputCheck(newValue))
  }

  const handleOriginalTitleBlur = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value
    setOriginalTitleValid(requiredInputCheck(newValue))
  }

  const handleEditSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    // form data 전송
    if (!isTitleValid) {
      return
    }
    if (!isOriginalTitleValid) {
      return
    }

    setOptionList(
      optionList.filter((option) => option.name && option.description)
    )

    if (optionList.length < MIN_OPTION) {
      return
    }

    if (!tasteIdList.length) {
      return
    }

    const formData = new FormData()
    formData.append('userId', '1')
    if (image) {
      formData.append('image', image as string)
    }
    formData.append('franchiseId', `${franchiseId}`)
    formData.append('title', title)
    formData.append('content', '')
    formData.append('originalTitle', originalTitle)
    if (expectedPrice) {
      formData.append('expectedPrice', expectedPrice.toString())
    }
    formData.append('optionList', JSON.stringify(optionList))
    formData.append('tasteList', JSON.stringify(tasteIdList))

    /*
    for (const [key, value] of formData) {
      console.log(key, ': ', value)
    }
    */
    // mutation 호출

    //성공 시 response data = id ㅇㄷ
  }
  return (
    <FlexContainer>
      <Title>메뉴 수정</Title>
      <ImageUploader onChange={handleImageChange} />
      <InputWrapper>
        <Select name={NAME_SELECT} onChange={handleFranchiseChange}>
          {dummyFranchiseList.map((franchise) => (
            <option key={franchise.id} value={franchise.id}>
              {franchise.name}
            </option>
          ))}
        </Select>
        <Input
          height={2.4}
          type="text"
          name={NAME_TITLE}
          value={title}
          required={true}
          placeholder={PLACEHOLDER_TITLE}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          isValid={isTitleValid}
        />
        <Input
          height={2.4}
          type="text"
          name={NAME_ORIGINAL_TITLE}
          value={originalTitle}
          required={true}
          placeholder={PLACEHOLDER_ORIGINAL_TITLE}
          onChange={handleOriginalTitleChange}
          onBlur={handleOriginalTitleBlur}
          isValid={isOriginalTitleValid}
        />
        <Button width={10} height={4} onClick={handleOptionAddBtnClick}>
          + 옵션
        </Button>
        {optionList.map((option, idx) => (
          <Flex key={idx}>
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
              width={8}
              height={4}
              onClick={() => handleOptionDelBtnClick(idx)}
            >
              삭제
            </Button>
          </Flex>
        ))}
        <PriceInput
          width={20}
          height={2.4}
          type="text"
          name={NAME_EXPECTED_PRICE}
          value={expectedPrice.toString()}
          placeholder={PLACEHOLDER_EXPECTED_PRICE}
          onChange={handlePriceChange}
        />
      </InputWrapper>
      <SubTitle>맛</SubTitle>
      <TagContainer
        selectedTasteIdList={tasteIdList}
        onChange={handleTagListChange}
      />
      <Button onClick={handleEditSubmit}>메뉴 수정</Button>
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
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

const Title = styled.h1`
  font-size: 4rem;
  align-self: start;
`

const Select = styled.select`
  width: 100%;
  height: 3.2rem;
`

const OptionName = styled(Input)`
  width: 40%;
`
const OptionDescription = styled(Input)`
  width: 50%;
`

const PriceInput = styled(Input)`
  width: 70%;
  align-self: end;
`

const SubTitle = styled.h3`
  font-size: 2.4rem;
  align-self: start;
`

export default EditMenu
