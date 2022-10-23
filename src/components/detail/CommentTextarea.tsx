import styled from '@emotion/styled'
import { getPlaceholder } from '@utils/placeholder'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'

interface Props {
  type: 'normal' | 'edit'
  isLoggedIn: boolean
  onAdd: (commen: string) => void
  defaultValue?: string
}

export interface TextareaHandle {
  clear: () => void
  focus: () => void
}

const CommentTextarea = forwardRef<TextareaHandle, Props>(
  ({ type, isLoggedIn, onAdd, defaultValue }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useImperativeHandle(ref, () => ({
      clear: () => {
        if (textareaRef.current) {
          const element = textareaRef.current
          element.value = ''
          element.style.height = '4.8rem'
        }
      },
      focus: () => {
        if (textareaRef.current) {
          const element = textareaRef.current
          const end = element.value.length
          element.focus()
          element.setSelectionRange(end, end)
        }
      }
    }))

    const handleChange = () => {
      if (!textareaRef.current) {
        return
      }

      textareaRef.current.style.height = '4.8rem'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }

    const addComment = () => {
      if (!isLoggedIn || !textareaRef.current) {
        return
      }

      const comment = textareaRef.current.value

      if (comment.replace(/\s/g, '').length === 0) {
        alert('댓글을 입력하지 않았어요')

        return
      }

      onAdd(comment)
    }

    const handleAddClick = () => {
      addComment()
    }

    const handleEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.nativeEvent.isComposing) {
        return
      }

      if (e.key === 'Enter' && textareaRef.current?.value === '') {
        e.preventDefault()
      }

      if (e.key === 'Enter' && e.shiftKey) {
        return
      } else if (e.key === 'Enter') {
        addComment()
        e.preventDefault()
      }
    }

    return (
      <>
        <Textarea
          ref={textareaRef}
          defaultValue={defaultValue}
          disabled={!isLoggedIn}
          placeholder={getPlaceholder(type, isLoggedIn)}
          maxLength={80}
          onChange={handleChange}
          onKeyDown={handleEnterPress}
        />
        <AddCommentButton onClick={handleAddClick}>등록</AddCommentButton>
      </>
    )
  }
)

const Textarea = styled.textarea`
  width: 100%;
  height: 4.8rem;
  min-height: 4.8rem;
  font-size: 1.6rem;
  border: 0.1rem solid ${({ theme }) => theme.color.borderBasic};
  border-radius: 1rem;
  padding: 1.4rem 6rem 1rem 1rem;
  resize: none;
  overflow: hidden;

  &:focus {
    outline: none;
    border: 0.1rem solid black;
  }

  &:disabled {
    background-color: white;
    border: 0.1rem solid rgb(133, 133, 133);
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

CommentTextarea.displayName = 'CommentTextarea'

export default CommentTextarea
