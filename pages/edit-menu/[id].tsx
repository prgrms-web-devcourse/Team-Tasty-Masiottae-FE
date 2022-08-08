import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import TagContainer from '@components/TagContainer'
import ImageUploader from '@components/ImageUploader'
import Button from '@components/Button'
import { Option } from '@interfaces'
import { useMenu } from '@hooks/queries/useMenu'
import { useChangeMenu } from '@hooks/mutations/useChangeMenuMutation'
import { useRouter } from 'next/router'
import { InputList } from '@components/create-menu/InputList'
import { useRecoilState } from 'recoil'
import { currentUser } from '@recoil/currentUser'
export interface InputListType {
  franchiseId: number
  title: string
  originalTitle: string
  optionList: Option[]
  expectedPrice: number
  isPriceButtonClicked: boolean
}

const EditMenu = () => {
  // 필드 값
  const [{ id: userId }] = useRecoilState(currentUser)
  const router = useRouter()
  const { id } = router.query

  const { mutate } = useChangeMenu()
  const { data: menuData } = useMenu(Number(id))
  console.log(menuData)
  useEffect(() => {
    if (menuData) {
      setFranchiseId(menuData.franchise.id)
      setTitle(menuData.title)
      setOriginalTitle(menuData.originalTitle)
      setOptionList(menuData.optionList)
      setExpectedPrice(menuData.expectedPrice)
      setTasteIdList(menuData.tasteList.map((taste) => taste.id))
      setIsPriceButtonClicked(!menuData.expectedPrice)
    }
  }, [menuData])

  const [franchiseId, setFranchiseId] = useState(1)
  const [title, setTitle] = useState('')
  const [originalTitle, setOriginalTitle] = useState('')
  const [optionList, setOptionList] = useState<Option[]>([])
  const [expectedPrice, setExpectedPrice] = useState(0)
  const [isPriceButtonClicked, setIsPriceButtonClicked] = useState(false)

  const [file, setFile] = useState<File | null>(null)
  const [tasteIdList, setTasteIdList] = useState<number[]>([])

  const handleInputChange = ({
    franchiseId,
    title,
    originalTitle,
    optionList,
    expectedPrice,
    isPriceButtonClicked
  }: InputListType) => {
    setFranchiseId(franchiseId)
    setTitle(title)
    setOriginalTitle(originalTitle)
    setOptionList(optionList)
    setExpectedPrice(expectedPrice)
    setIsPriceButtonClicked(isPriceButtonClicked)
  }

  // onChange handler
  const handleImageChange = (file: File) => {
    setFile(file)
  }

  const handleTagListChange = (tagIdList: number[]) => {
    setTasteIdList(tagIdList)
  }

  const handleEditSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    const data = {
      userId: userId,
      franchiseId,
      title,
      originalTitle,
      optionList,
      expectedPrice,
      tasteIdList,
      content: ''
    }
    mutate(
      { menuId: Number(id), image: file, data: data },
      {
        onSuccess: () => {
          console.log('응답 완료')
          router.replace(`/detail/${id}`)
        }
      }
    )
  }

  return (
    <FlexContainer>
      <ImageUploaderWrapper>
        <ImageUploader value={menuData?.image} onChange={handleImageChange} />
      </ImageUploaderWrapper>
      <InputList
        franchiseId={franchiseId}
        title={title}
        originalTitle={originalTitle}
        optionList={optionList}
        expectedPrice={expectedPrice}
        isPriceButtonClicked={isPriceButtonClicked}
        onChange={handleInputChange}
      ></InputList>
      <SubTitle>맛</SubTitle>
      <TagContainer
        selectedTasteIdList={tasteIdList}
        onChange={handleTagListChange}
      />
      <SubmitButton
        color={'#fff'}
        backgroundColor={'#000'}
        disabled={
          !(
            title &&
            originalTitle &&
            optionList.length &&
            tasteIdList.length &&
            (expectedPrice || isPriceButtonClicked)
          )
        }
        onClick={handleEditSubmit}
      >
        메뉴 수정
      </SubmitButton>
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
  width: calc(100% + 4rem);
`

const SubTitle = styled.h3`
  font-size: 2.4rem;
  align-self: start;
`

const SubmitButton = styled(Button)`
  font-weight: 700;
`

export default EditMenu
