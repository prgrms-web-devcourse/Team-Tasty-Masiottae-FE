import Tag from '@components/Tag'
import styled from '@emotion/styled'
import { useState } from 'react'

const TASTE_TAG = [
  '차가운',
  '뜨거운',
  '달달한',
  '짠',
  '매콤한',
  '아주 매운',
  '새큼한',
  '쌈싸름한',
  '아주 단',
  '감칠맛나는',
  '톡쏘는',
  '아주매운',
  '얼얼한',
  '구수한',
  '밍밍한',
  '아주 쓴',
  '아주 신',
  '새콤달콤',
  '진한'
]

const AddMenu = () => {
  const handleImageBoxClick = () => {
    console.log('click')
  }

  return (
    <FlexContainer>
      <Title>메뉴 등록</Title>
      <ImageBox onClick={handleImageBoxClick}></ImageBox>
      <FileInput type="file"></FileInput>
      <TagContainer>
        {TASTE_TAG.map((taste, idx) => (
          <Tag key={idx} name={taste} size={2}></Tag>
        ))}
      </TagContainer>
    </FlexContainer>
  )
}
export default AddMenu

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h1`
  font-size: 4rem;
  align-self: start;
`

const ImageBox = styled.div`
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
  background-color: #d9d9d9;
  overflow-y: scroll;
  gap: 0.5rem;
  ::-webkit-scrollbar {
    display: none;
  }
`

/*
  ::-webkit-scrollbar {
    display: none;
  }
*/
