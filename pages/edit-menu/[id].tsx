import { useState } from 'react'
import styled from '@emotion/styled'
import Input from '@components/Input'
import Tag from '@components/Tag'
import { Option } from '@customTypes/index'
import {
  dummyFranchiseList,
  dummyTasteList,
  dummyMenu
} from '@constants/dummyMenu'

const CreateMenu = () => {
  const [options, setOptions] = useState<Option[]>(dummyMenu.options)
  const selectedTags = dummyMenu.tastes
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
  const handleClickTag = (clickedTagId: number) => {
    selectedTags.map(({ id }) => id === clickedTagId)
  }
  return (
    <FlexContainer>
      <Title>메뉴 수정</Title>
      <ImageBox htmlFor="image-input"></ImageBox>
      <FileInput id="image-input" type="file"></FileInput>
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
        <OptionButton onClick={handleOptionAddBtnClick}>+ 옵션</OptionButton>

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
            <OptionDeleteButton onClick={() => handleOptionDelBtnClick(idx)}>
              삭제
            </OptionDeleteButton>
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
        {dummyTasteList.map((taste) => (
          <Tag
            key={taste.id}
            id={taste.id}
            name={taste.name}
            color={taste.color}
            height={3.2}
            onClick={handleClickTag}
          ></Tag>
        ))}
      </TagContainer>
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
