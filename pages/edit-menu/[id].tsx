import React, { useState } from 'react'
import styled from '@emotion/styled'
import Input from '@components/Input'
import TagContainer from '@components/TagContainer'
import ImageUploader from '@components/ImageUploader'
import Button from '@components/Button'
import { Option } from '@interfaces'
import { dummyMenu } from '@constants/dummyMenu'
import { useMenu } from '@hooks/queries/useMenu'
import { useChangeMenu } from '@hooks/mutations/useChangeMenuMutation'
import { MIN_OPTION } from '@constants/menuConstant'
import { useRouter } from 'next/router'
import { InputList } from '@components/create-menu/InputList'

export interface InputListType {
  franchiseId: number
  title: string
  originalTitle: string
  optionList: Option[]
  expectedPrice: number
}

const EditMenu = () => {
  // 필드 값
  const router = useRouter()
  const { id } = router.query

  const { mutate } = useChangeMenu()
  const { data: menuData } = useMenu(Number(id))

  const [file, setFile] = useState<File | null>(null)
  const [tasteIdList, setTasteIdList] = useState<number[]>(
    dummyMenu.tastes.map((taste) => taste.id)
  )

  const [inputList, setInputList] = useState<InputListType>()
  const [isInputValid, setIsInputValid] = useState(true)
  // onChange handler
  const handleImageChange = (file: File) => {
    setFile(file)
  }

  const handleTagListChange = (tagIdList: number[]) => {
    setTasteIdList(tagIdList)
  }

  const handleEditSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    // api 호출
    /*
    mutate(
      { menuId: Number(id), image: file, data: data },
      {
        onSuccess: () => {
          router.replace(`/detail/${id}`)
        }
      }
    )
    */
  }
  const handleInputChange = (
    inputData: InputListType,
    isDataValid: boolean
  ) => {
    console.log(inputData)
    console.log(isDataValid)
  }
  return (
    <FlexContainer>
      <ImageUploaderWrapper>
        <ImageUploader value={menuData?.image} onChange={handleImageChange} />
      </ImageUploaderWrapper>
      <InputList
        franchiseId={menuData?.franchise.id}
        title={menuData?.title}
        originalTitle={menuData?.originalTitle}
        optionList={menuData?.optionList}
        expectedPrice={menuData?.expectedPrice}
        onChange={handleInputChange}
      ></InputList>
      <SubTitle>맛</SubTitle>
      <TagContainer
        selectedTasteIdList={tasteIdList}
        onChange={handleTagListChange}
      />
      <Button
        color={'#fff'}
        backgroundColor={'#000'}
        disabled={isInputValid}
        onClick={handleEditSubmit}
      >
        메뉴 추가
      </Button>
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

const ImageUploaderWrapper = styled.div`
  width: calc(100% + 40px);
`

const SubTitle = styled.h3`
  font-size: 2.4rem;
  align-self: start;
`

export default EditMenu
