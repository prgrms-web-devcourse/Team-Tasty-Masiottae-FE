import { useState } from 'react'
import styled from '@emotion/styled'
import Input from '@components/Input'
import TagContainer from '@components/TagContainer'
import ImageUploader from '@components/ImageUploader'
import { ImageType, Option, Taste } from '@customTypes/index'
import { dummyFranchiseList, dummyMenu } from '@constants/dummyMenu'

const TITLE_NAME = 'title'
const ORIGINAL_TITLE_NAME = 'original-title'
const OPTION_NAME_NAME = 'option-name'
const OPTION_DESCRIPTION_NAME = 'option-description'
const EXPECTED_PRICE_NAME = 'price'

const TITLE_PLACEHOLDER = '커스텀 메뉴의 제목을 지어주세요'
const ORIGINAL_TITLE_PLACEHOLDER = '기본이 되는 메뉴의 제목을 적어주세요'
const OPTION_NAME_PLACEHOLDER = '옵션 명'
const OPTION_DESCRIPTION_PLACEHOLDER = '옵션 단위, 또는 설명'
const EXPECTED_PRICE_PLACEHOLDER = '예상되는 최종 가격을 입력해주세요'

const CreateMenu = () => {
  const [options, setOptions] = useState<Option[]>(dummyMenu.options)
  const [tagList, setTagList] = useState<Taste[]>(dummyMenu.tastes)

  const handleImageChange = (image: ImageType) => {
    console.log(image)
  }
  const handleOptionAddBtnClick = () => {
    setOptions((options) => {
      const newOptions = [...options, { name: '', description: '' }]
      return newOptions
    })
  }
  const handleOptionDelBtnClick = (deletedIdx: number) => {
    setOptions((options) => {
      const newOptions = options.filter((_, idx) => deletedIdx !== idx)
      return newOptions
    })
  }
  const handleTagListChange = (tagIdList: number[]) => {
    console.log(tagIdList)
  }
  return (
    <FlexContainer>
      <Title>메뉴 수정</Title>
      <ImageUploader onChange={handleImageChange} />
      <InputWrapper>
        <Select name="brand">
          {dummyFranchiseList.map((franchise) => (
            <option key={franchise.id} value={franchise.name}>
              {franchise.name}
            </option>
          ))}
        </Select>
        <TitleInput
          height={2.4}
          type="text"
          name={TITLE_NAME}
          value={dummyMenu.title}
          required={true}
          placeholder={TITLE_PLACEHOLDER}
        />
        <TitleInput
          height={2.4}
          type="text"
          name={ORIGINAL_TITLE_NAME}
          value={dummyMenu.originalTitle}
          required={true}
          placeholder={ORIGINAL_TITLE_PLACEHOLDER}
        />
        <OptionButton onClick={handleOptionAddBtnClick}>+ 옵션</OptionButton>
        {options.map((option, idx) => (
          <Flex key={idx}>
            <OptionName
              height={2.4}
              type="text"
              name={OPTION_NAME_NAME}
              value={option.name}
              placeholder={OPTION_NAME_PLACEHOLDER}
            />
            <OptionDescription
              height={2.4}
              type="text"
              name={OPTION_DESCRIPTION_NAME}
              value={option.description}
              placeholder={OPTION_DESCRIPTION_PLACEHOLDER}
            />
            <OptionDeleteButton onClick={() => handleOptionDelBtnClick(idx)}>
              삭제
            </OptionDeleteButton>
          </Flex>
        ))}
        <PriceInput
          width={20}
          height={2.4}
          type="text"
          name={EXPECTED_PRICE_NAME}
          value={dummyMenu.expectedPrice.toString()}
          placeholder={EXPECTED_PRICE_PLACEHOLDER}
        />
      </InputWrapper>
      <SubTitle>맛</SubTitle>
      <TagContainer
        selectedTasteIdList={tagList.map((tag) => tag.id)}
        onChange={handleTagListChange}
      />
      <button>메뉴 수정</button>
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

const OptionButton = styled.button`
  width: 8rem;
  height: 2.8rem;
`

const OptionName = styled(Input)`
  width: 30%;
`
const OptionDescription = styled(Input)`
  width: 60%;
`

const OptionDeleteButton = styled.button`
  width: 10%;
`

const PriceInput = styled(Input)`
  width: 70%;
  align-self: end;
`

const SubTitle = styled.h3`
  font-size: 2.4rem;
  align-self: start;
`

export default CreateMenu
