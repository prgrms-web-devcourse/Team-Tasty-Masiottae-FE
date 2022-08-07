import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Input from '@components/Input'
import FranchiseSelect from '@components/FranchiseSelect'
import TagContainer from '@components/TagContainer'
import ImageUploader from '@components/ImageUploader'
import Button from '@components/Button'
import { Option } from '@interfaces'
import { dummyMenu } from '@constants/dummyMenu'
import { useMenu } from '@hooks/queries/useMenu'
import { useChangeMenu } from '@hooks/mutations/useChangeMenuMutation'
import {
  MIN_OPTION,
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
  PLACEHOLDER_EXPECTED_PRICE
} from '@constants/menuConstant'
import { useRouter } from 'next/router'

const EditMenu = () => {
  // 필드 값
  const router = useRouter()
  const { id } = router.query

  const mutate = useChangeMenu()
  const { data: menuData } = useMenu(Number(id))

  useEffect(() => {
    if (menuData) {
      setFranchiseId(menuData.franchise.id)
      setTitle(menuData.title)
      setOriginalTitle(menuData.originalTitle)
      setOptionList(menuData.optionList)
      setExpectedPrice(menuData.expectedPrice)
    }
  }, [menuData])
  const [file, setFile] = useState<File | null>(null)
  const [franchiseId, setFranchiseId] = useState(0)
  const [title, setTitle] = useState('')
  const [originalTitle, setOriginalTitle] = useState(dummyMenu.originalTitle)
  const [optionList, setOptionList] = useState<Option[]>([])
  const [tasteIdList, setTasteIdList] = useState<number[]>(
    dummyMenu.tastes.map((taste) => taste.id)
  )
  const [expectedPrice, setExpectedPrice] = useState(dummyMenu.expectedPrice)

  // valid 값
  const [isTitleValid, setTitleValid] = useState(true)
  const [isOriginalTitleValid, setOriginalTitleValid] = useState(true)
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
    // api 호출
  }
  return (
    <FlexContainer>
      <Title>메뉴 수정</Title>
      <ImageUploader value={menuData?.image} onChange={handleImageChange} />
      <InputWrapper>
        <FranchiseSelect onChange={handleFranchiseChange} />
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
