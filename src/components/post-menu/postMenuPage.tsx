import React, { useEffect, useState } from 'react'
import theme from '@constants/theme'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { TagContainer, ImageUploader, Button } from '@components/common'
import { Option } from '@interfaces'
import { usePostMenu } from '@hooks/mutations/usePostMenuMutation'
import { InputList } from '@components/post-menu/InputList'
import { useChangeMenu } from '@hooks/mutations/useChangeMenuMutation'

interface InputListType {
  franchiseId: number
  title: string
  originalTitle: string
  optionList: Option[]
  expectedPrice: number
  isPriceButtonClicked: boolean
}

interface PostMenu extends InputListType {
  file: File | null
  tasteIdList: number[]
  isSubmitted: boolean
}

interface Props {
  menuId: number | null
  menuImage: string | null
  franchiseId: number
  title: string
  originalTitle: string
  optionList: Option[]
  expectedPrice: number
  tasteIdList: number[]
}

const PostMenuPage = ({
  menuId,
  menuImage,
  franchiseId,
  title,
  originalTitle,
  optionList,
  expectedPrice,
  tasteIdList
}: Props) => {
  const router = useRouter()
  const { mutate: postMenuMutate } = usePostMenu()
  const { mutate: changeMenuMutate } = useChangeMenu()
  const [isFileChange, setIsFileChange] = useState(false)

  const [postMenuState, setPostMenuState] = useState<PostMenu>({
    file: null,
    franchiseId,
    title,
    originalTitle,
    optionList,
    tasteIdList,
    expectedPrice,
    isPriceButtonClicked: expectedPrice ? false : true,
    isSubmitted: false
  })

  useEffect(() => {
    setPostMenuState((postMenuState) => {
      return {
        ...postMenuState,
        franchiseId,
        title,
        originalTitle,
        optionList,
        expectedPrice,
        tasteIdList
      }
    })
  }, [
    franchiseId,
    title,
    originalTitle,
    optionList,
    expectedPrice,
    tasteIdList
  ])

  const checkButtonDisabled = () => {
    const {
      isSubmitted,
      franchiseId,
      title,
      originalTitle,
      expectedPrice,
      optionList,
      tasteIdList,
      isPriceButtonClicked
    } = postMenuState

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

  const handleImageChange = (file: File | null) => {
    setPostMenuState((postMenuState) => {
      return { ...postMenuState, file }
    })
    if (menuId && file === null) {
      setIsFileChange(true)
    }
  }

  const handleTagListChange = (tagIdList: number[]) => {
    setPostMenuState((postMenuState) => {
      return { ...postMenuState, tasteIdList: tagIdList }
    })
  }

  const handleEditSubmit = async () => {
    setPostMenuState((postMenuState) => {
      return {
        ...postMenuState,
        isSubmitted: true,
        optionList: postMenuState.optionList.filter(
          (option) => option.name && option.description
        )
      }
    })

    const {
      file,
      franchiseId,
      title,
      originalTitle,
      expectedPrice,
      optionList,
      tasteIdList
    } = postMenuState

    if (!menuId) {
      const data = {
        franchiseId,
        title,
        content: '',
        originalTitle,
        expectedPrice,
        optionList,
        tasteIdList
      }

      postMenuMutate(
        { image: file, data },
        {
          onSuccess: (data) => {
            router.replace(`/detail/${data.menuId}`)
          }
        }
      )
    } else {
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
      changeMenuMutate(
        { menuId: menuId, image: file, data: data },
        {
          onSuccess: () => {
            router.replace(`/detail/${menuId}`)
          }
        }
      )
    }
  }

  const handleInputChange = ({
    franchiseId,
    title,
    originalTitle,
    optionList,
    expectedPrice,
    isPriceButtonClicked
  }: InputListType) => {
    setPostMenuState((postMenuState) => {
      return {
        ...postMenuState,
        franchiseId,
        title,
        originalTitle,
        optionList,
        expectedPrice,
        isPriceButtonClicked
      }
    })
  }

  return (
    <>
      <FlexContainer>
        <ImageUploaderWrapper>
          <ImageUploader
            value={menuImage}
            isDeletable={true}
            onChange={handleImageChange}
          />
        </ImageUploaderWrapper>
        <InputList
          franchiseId={postMenuState.franchiseId}
          title={postMenuState.title}
          originalTitle={postMenuState.originalTitle}
          optionList={postMenuState.optionList}
          expectedPrice={postMenuState.expectedPrice}
          isPriceButtonClicked={postMenuState.isPriceButtonClicked}
          onChange={handleInputChange}
        ></InputList>
        <SubTitle>맛</SubTitle>
        <TagContainer
          selectedTasteIdList={postMenuState.tasteIdList}
          onChange={handleTagListChange}
        />
        <SubmitButton
          color={theme.color.mainWhite}
          backgroundColor={theme.color.mainBlack}
          disabled={checkButtonDisabled()}
          onClick={handleEditSubmit}
        >
          {menuId ? '수정' : '등록'} 하기
        </SubmitButton>
      </FlexContainer>
    </>
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
  font-size: 2rem;
  align-self: start;
`

const SubmitButton = styled(Button)`
  font-weight: 700;
  font-size: 2rem;
`

export default PostMenuPage
