import React, { ChangeEvent, useCallback, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { usePostCommentMutation } from '@hooks/mutations/usePostCommentMutation'
import { Modal } from '@components/common'

const GUEST_INPUT_PLACEHOLDER = '로그인 후 작성해주세요(최대 80자).'
const LOGGEDIN_INPUT_PLACEHOLDER = '댓글을 입력해주세요.'

interface Props {
  menuId: number
  userId: number | null
}

const CommentInput = ({ menuId, userId }: Props) => {
  const [comment, setComment] = useState('')
  const [isLoggedIn] = useState(!!userId)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { mutate: postComment } = usePostCommentMutation()

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current === null) {
      return
    }

    textareaRef.current.style.height = '4.8rem'
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'

    setComment(e.target.value)
  }, [])

  const addComment = () => {
    if (comment.replace(/\s/g, '').length === 0) {
      return
    }

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
          setComment('')
          if (textareaRef.current) {
            textareaRef.current.value = ''
            textareaRef.current.style.height = '4.8rem'
          }
        }
      }
    )
  }

  const handleAddClick = () => {
    addComment()
  }

  const handleEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      addComment()
    }
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
      <Textarea
        ref={textareaRef}
        placeholder={
          isLoggedIn ? LOGGEDIN_INPUT_PLACEHOLDER : GUEST_INPUT_PLACEHOLDER
        }
        maxLength={80}
        onChange={handleChange}
        onKeyDown={handleEnterPress}
      />
      <AddCommentButton onClick={handleAddClick}>등록</AddCommentButton>
      <Modal visible={isModalOpen} onClose={handleModalClose}>
        <ModalItem>
          <span>로그인하세요.</span>
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

const Textarea = styled.textarea`
  width: 100%;
  height: 4.8rem;
  min-height: 4.8rem;
  font-size: 1.6rem;
  border-radius: 1rem;
  padding: 1.4rem 6rem 1rem 1rem;
  resize: none;
  overflow: hidden;

  &:focus {
    outline: none;
  }
`

const AddCommentButton = styled.button`
  position: absolute;
  bottom: 0.6rem;
  right: 0.6rem;
  width: 5rem;
  height: 3.6rem;
  font-weight: 700;
  border: none;
  border-radius: 1rem;
  color: #f5f5f5;
  background-color: black;
  margin-left: -6rem;
  cursor: pointer;
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

export default CommentInput
