import styled from '@emotion/styled'
import Input from '@components/Input'
import { useState } from 'react'
import { TASTE_LIST } from '@constants/taste'
import { FRANCHISE_LIST } from '@constants/franchise'
import Tag from '@components/Tag'
import { TasteType } from '@customTypes/index'

const dummyMenu = {
  id: '1',
  franchise: '스타벅스',
  image: '',
  title: '메뉴명',
  originalTitle: '실제 메뉴명',
  author: {},
  content: '설명' || null,
  options: [
    { name: '에스프레소샷', description: '1' },
    { name: '자바칩', description: '약간' },
    { name: '아이스크림', description: '한스쿱' }
  ],
  expectedPrice: 5000,
  tastes: ['매콤함', '느끼함'],
  likes: 100,
  createdAt: String,
  updatedAt: String
}

interface Option {
  name: string
  description: string
}

const CreateMenu = () => {
  const [options, setOptions] = useState<Option[]>(dummyMenu.options)
  let selectedTags: TasteType[] = []
  const handleOptionBtnClick = () => {
    console.log(options)
    setOptions((options) => {
      const newOptions = [...options, { name: '', description: '' }]
      return newOptions
    })
  }
  const handleClickTag = (clickedTag: TasteType) => {
    if (selectedTags.includes(clickedTag)) {
      selectedTags = selectedTags.filter((tag) => tag !== clickedTag)
    } else {
      selectedTags.push(clickedTag)
    }
  }
  return (
    <FlexContainer>
      <Title>메뉴 수정</Title>
      <ImageBox htmlFor="image-input"></ImageBox>
      <FileInput id="image-input" type="file"></FileInput>
      <InputWrapper>
        <Select name="brand">
          {FRANCHISE_LIST.map((franchise, idx) => (
            <option key={idx} value={franchise}>
              {franchise}
            </option>
          ))}
        </Select>
        <TitleInput
          height={2.4}
          type="text"
          name="title"
          required={true}
          placeholder="커스텀 메뉴의 제목을 지어주세요"
        />
        <TitleInput
          height={2.4}
          type="text"
          name="original-title"
          required={true}
          placeholder="기본이 되는 메뉴의 제목을 적어주세요"
        />
        <OptionButton onClick={handleOptionBtnClick}>+ 옵션</OptionButton>

        {options.map((option, idx) => (
          <Flex key={idx}>
            <OptionName
              height={2.4}
              type="text"
              name="option-name"
              placeholder="옵션 명"
            />
            <OptionDescription
              height={2.4}
              type="text"
              name="option-name"
              placeholder="옵션 단위, 또는 설명"
            />
          </Flex>
        ))}
        <PriceInput
          width={20}
          height={2.4}
          type="text"
          name="price"
          placeholder="최종 가격을 입력해주세요"
        />
      </InputWrapper>
      <SubTitle>맛</SubTitle>
      <TagContainer>
        {TASTE_LIST.map((taste, idx) => (
          <Tag
            key={idx}
            name={taste}
            height={3.2}
            onClick={handleClickTag}
          ></Tag>
        ))}
      </TagContainer>
    </FlexContainer>
  )
}
export default CreateMenu

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
  gap: 8px;
`

const Title = styled.h1`
  font-size: 4rem;
  align-self: start;
`

const ImageBox = styled.label`
  width: 30rem;
  height: 30rem;
  background-color: #d9d9d9;
  &:hover {
    cursor: pointer;
  }
`

const FileInput = styled.input`
  visibility: hidden;
`

const TagContainer = styled.div`
  width: 80%;
  height: 10rem;
  display: flex;
  flex-wrap: wrap;
  padding: 0 0.5rem;
  background-color: #d9d9d9;
  overflow-y: scroll;
  gap: 0.5rem;
  ::-webkit-scrollbar {
    display: none;
  }
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
  width: 70%;
`

const PriceInput = styled(Input)`
  width: 70%;
  align-self: end;
`

const SubTitle = styled.h3`
  font-size: 2.4rem;
  align-self: start;
`
