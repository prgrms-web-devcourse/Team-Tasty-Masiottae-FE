import React, { useState, useEffect, useCallback } from 'react'
import styled from '@emotion/styled'
import TagContainer from '@components/TagContainer'
import ImageUploader from '@components/ImageUploader'
import Button from '@components/Button'
import { Option } from '@interfaces'
import { useMenu } from '@hooks/queries/useMenu'
import { useChangeMenu } from '@hooks/mutations/useChangeMenuMutation'
import { useRouter } from 'next/router'
import { InputList } from '@components/create-menu/InputList'
import { useRecoilValue } from 'recoil'
import { currentUser } from '@recoil/currentUser'

import Spinner from '@components/Spinner'
import useRouterLoading from '@hooks/useRouterLoading'
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

  const router = useRouter()

  const isRouterLoading = useRouterLoading()

  const { id } = router.query
  const user = useRecoilValue(currentUser)
  const { mutate, isLoading: changeMenuLoading } = useChangeMenu()
  const { data: menuData, isLoading: getMenuLoading } = useMenu(Number(id))
  useEffect(() => {
    if (menuData) {
      if (menuData.author.id !== user.id) {
        alert('글쓴이만 수정할 수 있어요')
        router.replace(`/detail/${id}`)
      }

      setFranchiseId(menuData.franchise.id)
      setTitle(menuData.title)
      setOriginalTitle(menuData.originalTitle)
      setOptionList(menuData.optionList)
      setExpectedPrice(menuData.expectedPrice)
      setTasteIdList(menuData.tasteList.map((taste) => taste.id))
      setIsPriceButtonClicked(!menuData.expectedPrice)
    }
  }, [menuData])
  const [file, setFile] = useState<File | null>(null)
  const [isFileChange, setIsFileChange] = useState(false)

  const [franchiseId, setFranchiseId] = useState(1)
  const [title, setTitle] = useState('')
  const [originalTitle, setOriginalTitle] = useState('')
  const [optionList, setOptionList] = useState<Option[]>([])
  const [expectedPrice, setExpectedPrice] = useState(0)
  const [isPriceButtonClicked, setIsPriceButtonClicked] = useState(false)
  const [tasteIdList, setTasteIdList] = useState<number[]>([])

  const [isSubmitted, setIsSubmitted] = useState(false)

  const checkButtonDisabled = () => {
    return !(
      !isSubmitted &&
      franchiseId &&
      title &&
      originalTitle &&
      optionList.filter((option) => option.name && option.description).length &&
      tasteIdList.length &&
      (isPriceButtonClicked || expectedPrice > 0)
    )
  }

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
  const handleImageChange = (file: File | null) => {
    setFile(file)
    if (file === null) {
      setIsFileChange(true)
    }
  }

  const handleTagListChange = (tagIdList: number[]) => {
    setTasteIdList(tagIdList)
  }

  const handleEditSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    setIsSubmitted(true)
    const data = {
      franchiseId,
      title,
      originalTitle,
      optionList,
      expectedPrice,
      tasteIdList,
      isRemoveImage: isFileChange,
      content: ''
    }
    mutate(
      { menuId: Number(id), image: file, data: data },
      {
        onSuccess: () => {
          router.replace(`/detail/${id}`)
        }
      }
    )
  }

  return (
    <FlexContainer>
      {isRouterLoading || changeMenuLoading || getMenuLoading ? (
        <Spinner />
      ) : (
        ''
      )}
      <ImageUploaderWrapper>
        <ImageUploader
          value={menuData?.image}
          isDeletable={true}
          onChange={handleImageChange}
        />
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
        disabled={checkButtonDisabled()}
        onClick={handleEditSubmit}
      >
        수정 하기
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
  font-size: 2rem;
`

export default EditMenu
