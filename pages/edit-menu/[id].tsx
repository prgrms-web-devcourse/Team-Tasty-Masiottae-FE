import styled from '@emotion/styled'
import Input from '@components/Input'
import { useState } from 'react'
import Tag from '@components/Tag'
import { TasteNameType } from '@customTypes/index'

const dummyFranchiseList = [
  { id: 0, name: '스타벅스' },
  { id: 1, name: '이디야' },
  { id: 2, name: '공차' },
  { id: 3, name: '아마스빈' },
  { id: 4, name: '서브웨이' }
]

interface TasteType {
  id: number
  name: TasteNameType
  color : string 
}

const dummyTasteList: TasteType[] = [
  { id: 0, name: '차가운', color : '#00B5E3'},
  { id: 1, name: '뜨거운', color : '#FF3333'},
  { id: 2, name: '달콤한', color : '#CC0099'},
  { id: 3, name: '매콤한', color : '#df2020'},
  { id: 4, name: '새콤한', color : '#FFDD33'},
  { id: 5, name: '쌉쌀한', color : '#339966'},
  { id: 6, name: '짭짤한', color : '#FF5533'}
]

const dummyMenu = {
  id: '1',
  franchise: { id: 'franchise1', name: '스타벅스' },
  image: '',
  title: '슈렉 프라푸치노',
  originalTitle: '제주 유기농 말차로 만든 크림 프라푸치노',
  author: { id: 'user1' },
  content: '설명' || null,
  options: [
    { name: '에스프레소샷', description: '1' },
    { name: '자바칩', description: '약간' },
    { name: '아이스크림', description: '한 스쿱' }
  ],
  expectedPrice: 6700,
  tastes: [
    { id: 'taste1', name: '차가운', color :  "#00B5E3" },
    { id: 'taste2', name: '달콤한', color : "#CC0099"}
  ],
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
  let selectedTags = dummyMenu.tastes
  const handleOptionBtnClick = () => {
    setOptions((options) => {
      const newOptions = [...options, { name: '', description: '' }]
      return newOptions
    })
  }
  const handleClickTag = (clickedTag: TasteNameType) => {
    selectedTags.map(({id, name}) => );
  }
  return (
    <FlexContainer>
      <Title>메뉴 수정</Title>
      <ImageBox htmlFor="image-input"></ImageBox>
      <FileInput id="image-input" type="file"></FileInput>
      <InputWrapper>
        <Select name="brand">
          {dummyFranchiseList.map((franchise, idx) => (
            <option key={franchise.id} value={franchise.name}>
              {franchise.name}
            </option>
          ))}
        </Select>
        <TitleInput
          height={2.4}
          type="text"
          name="title"
          value={dummyMenu.title}
          required={true}
          placeholder="커스텀 메뉴의 제목을 지어주세요"
        />
        <TitleInput
          height={2.4}
          type="text"
          name="original-title"
          value={dummyMenu.originalTitle}
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
              value={option.name}
              placeholder="옵션 명"
            />
            <OptionDescription
              height={2.4}
              type="text"
              name="option-name"
              value={option.description}
              placeholder="옵션 단위, 또는 설명"
            />
          </Flex>
        ))}
        <PriceInput
          width={20}
          height={2.4}
          type="text"
          name="price"
          value={dummyMenu.expectedPrice.toString()}
          placeholder="최종 가격을 입력해주세요"
        />
      </InputWrapper>
      <SubTitle>맛</SubTitle>
      <TagContainer>
        {dummyTasteList.map((taste, idx) => (
          <Tag
            key={taste.id}
            name={taste.name}
            height={3.2}
            onClick={handleClickTag}
          ></Tag>
        ))}
      </TagContainer>
      <button>메뉴 수정</button>
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
