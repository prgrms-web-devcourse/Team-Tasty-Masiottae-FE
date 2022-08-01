import React, { useState } from 'react'
import { TASTE_LIST } from '@constants/taste'
import Tag from '@components/Tag'
import { TasteType } from '@customTypes/index'
import styled from '@emotion/styled'
import Modal from './Modal'
import { BsFilterRight } from 'react-icons/bs'
import { GrClose } from 'react-icons/gr'

const Filter = () => {
  let selectedTags: TasteType[] = []
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = (clickedTag: TasteType) => {
    if (selectedTags.includes(clickedTag)) {
      selectedTags = selectedTags.filter((tag) => tag !== clickedTag)
    } else {
      selectedTags.push(clickedTag)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Modal visible={isOpen} onClose={handleClose}>
        <Container>
          <Header>
            <div>
              <BsFilterRight />
              <span>필터</span>
            </div>
            <CloseButton onClick={() => setIsOpen(false)} />
          </Header>
          <TagContainer>
            {TASTE_LIST.map((taste, idx) => (
              <Tag key={idx} name={taste} height={3.2} onClick={handleClick} />
            ))}
          </TagContainer>
          <ApplyButton>필터 적용</ApplyButton>
        </Container>
      </Modal>
    </>
  )
}

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`

const Header = styled(Flex)`
  align-items: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`

const Container = styled(Flex)`
  width: 100%;
  flex-direction: column;
  padding: 2rem;
`

const CloseButton = styled(GrClose)`
  cursor: pointer;
`

const ApplyButton = styled.button`
  width: 100%;
  font-weight: 700;
  color: #f5f5f5;
  background-color: black;
  border: none;
  border-radius: 1rem;
  padding: 2rem;
  margin-top: 3rem;
  cursor: pointer;
`

const TagContainer = styled(Flex)`
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
`

export default Filter
