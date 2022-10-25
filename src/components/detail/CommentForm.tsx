import React, { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { usePostCommentMutation } from '@hooks/mutations/usePostCommentMutation'
import { Modal } from '@components/common'
import CommentTextarea, { TextareaHandle } from './CommentTextarea'

interface Props {
  menuId: number
  userId: number | null
}

const CommentForm = ({ menuId, userId }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { mutate: postComment } = usePostCommentMutation()
  const textareaRef = useRef<TextareaHandle>(null)

  useEffect(() => {
    setIsLoggedIn(!!userId)
  }, [userId])

  const handleAddClick = (comment: string) => {
    if (!userId) {
      return
    }

    postComment(
      {
        userId,
        menuId,
        comment
      },
      {
        onSuccess: () => {
          if (textareaRef.current) {
            textareaRef.current.clear()
          }
        }
      }
    )
  }

  const handleTextareaClick = (isLoggedIn: boolean) => {
    if (!isLoggedIn) {
      setIsModalOpen(true)
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  return (
    <CommentWriteContainer onClick={() => handleTextareaClick(isLoggedIn)}>
      <CommentTextarea
        ref={textareaRef}
        type="normal"
        isLoggedIn={isLoggedIn}
        onAdd={handleAddClick}
      />
      <Modal visible={isModalOpen} onClose={handleModalClose}>
        <ModalItem>
          <span>로그인해주세요.</span>
        </ModalItem>
      </Modal>
    </CommentWriteContainer>
  )
}

const Flex = styled.div`
  display: flex;
`

const CommentWriteContainer = styled(Flex)`
  position: relative;
  align-items: center;
  margin-bottom: 2rem;
`

const ModalItem = styled(Flex)`
  justify-content: center;
  align-items: center;
  height: 5rem;

  & > span {
    font-weight: 700;
    font-size: 1.8rem;
  }
`

export default CommentForm
