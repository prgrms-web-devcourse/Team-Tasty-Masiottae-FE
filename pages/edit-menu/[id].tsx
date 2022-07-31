import { useState } from 'react'
import styled from '@emotion/styled'
import Input from '@components/Input'
import TagContainer from '@components/TagContainer'
import ImageUploader from '@components/ImageUploader'
import Button from '@components/Button'
import { ImageType, Option, Taste } from '@customTypes/index'

import { dummyFranchiseList, dummyMenu } from '@constants/dummyMenu'
import { KeyObject } from 'crypto'

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
  const [image, setImage] = useState<ImageType>(dummyMenu.image)
  const [franchiseId, setFranchiseId] = useState(dummyMenu.franchise.id)
  const [title, setTitle] = useState(dummyMenu.title)
  const [originalTitle, setOriginalTitle] = useState(dummyMenu.originalTitle)
  const [optionList, setOptionList] = useState<Option[]>(dummyMenu.options)
  const [tasteIdList, setTasteIdList] = useState<number[]>(
    dummyMenu.tastes.map((taste) => taste.id)
  )

  const tagList = dummyMenu.tastes
  const handleImageChange = (image: ImageType) => {
    console.log(image)
    setImage(image)
  }
  const handleFranchiseChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setFranchiseId(Number(e.currentTarget.value))
  }
  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const title = e.currentTarget.value
    console.log(title)
  }

  const handleOriginalTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const originalTitle = e.currentTarget.value
    setOriginalTitle(originalTitle)
  }

  const handleOptionAddBtnClick = () => {
    setOptionList((optionList) => {
      const newOptions = [...optionList, { name: '', description: '' }]
      return newOptions
    })
  }
  const handleOptionDelBtnClick = (deletedIdx: number) => {
    setOptionList((optionList) => {
      const newOptions = optionList.filter((_, idx) => deletedIdx !== idx)
      return newOptions
    })
  }
  const handleOptionNameChange = (
    e: React.FormEvent<HTMLInputElement>,
    idx: number
  ) => {
    const newOptionName = e.currentTarget.value
    setOptionList((optionList) => {
      optionList[idx].name = newOptionName
      return optionList
    })
  }
  const handleOptionDescriptionChange = (
    e: React.FormEvent<HTMLInputElement>,
    idx: number
  ) => {
    const newOptionDescription = e.currentTarget.value
    setOptionList((optionList) => {
      optionList[idx].description = newOptionDescription
      return optionList
    })
  }

  const handleTagListChange = (tagIdList: number[]) => {
    console.log(tagIdList)
    setTasteIdList(tagIdList)
  }
  const handleEditSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    // form data 전송
    const formData = new FormData()
    formData.append('userId', '1')
    formData.append('image', image)
    formData.append('franchiseId', `${franchiseId}`)
    formData.append('title', title)
    formData.append('content', '')
    formData.append('originalTitle', originalTitle)
    formData.append('optionList', JSON.stringify(optionList))
    formData.append('tasteList', JSON.stringify(tasteIdList))
    for (const [key, value] of formData) {
      console.log(key, ': ', value)
    }
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
        <TitleInput
          height={2.4}
          type="text"
          name={NAME_TITLE}
          value={dummyMenu.title}
          required={true}
          placeholder={PLACEHOLDER_TITLE}
          onChange={handleTitleChange}
        />
        <TitleInput
          height={2.4}
          type="text"
          name={NAME_ORIGINAL_TITLE}
          value={dummyMenu.originalTitle}
          required={true}
          placeholder={PLACEHOLDER_ORIGINAL_TITLE}
          onChange={handleOriginalTitleChange}
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
              placeholder={PLACEHOLDER_OPTION_NAME}
              onChange={(e) => {
                handleOptionNameChange(e, idx)
              }}
            />
            <OptionDescription
              height={2.4}
              type="text"
              name={NAME_OPTION_DESCRIPTION}
              value={option.description}
              placeholder={PLACEHOLDER_OPTION_DESCRIPTION}
              onChange={(e) => {
                handleOptionDescriptionChange(e, idx)
              }}
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
          value={dummyMenu.expectedPrice.toString()}
          placeholder={PLACEHOLDER_EXPECTED_PRICE}
        />
      </InputWrapper>
      <SubTitle>맛</SubTitle>
      <TagContainer
        selectedTasteIdList={tagList.map((tag) => tag.id)}
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

const TitleInput = styled(Input)`
  width: 100%;
`

const OptionName = styled(Input)`
  width: 30%;
`
const OptionDescription = styled(Input)`
  width: 60%;
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
