import styled from '@emotion/styled'
import { usePostCommentMutation } from '@hooks/mutations/usePostCommentMutation'
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

const GUEST_INPUT_PLACEHOLDER = '로그인 후 작성해주세요(최대 80자).'
const LOGGEDIN_INPUT_PLACEHOLDER = '댓글을 입력해주세요.'

interface Props {
  menuId: number
  userId: number
}

const CommentInput = ({ menuId, userId }: Props) => {
  const [comment, setComment] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { mutate: postComment } = usePostCommentMutation()

  useEffect(() => {
    if (textareaRef.current === null) {
      return
    }

    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
  }, [])

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current === null) {
      return
    }

    textareaRef.current.style.height = '4rem'
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'

    setComment(e.target.value)
  }, [])

  const handleAddButtonClick = () => {
    postComment({
      userId,
      menuId,
      comment
    })
  }

  return (
    <CommentWriteContainer>
      <Textarea
        ref={textareaRef}
        placeholder={
          isLoggedIn ? LOGGEDIN_INPUT_PLACEHOLDER : GUEST_INPUT_PLACEHOLDER
        }
        maxLength={80}
        onChange={handleChange}
      />
      <AddCommentButton onClick={handleAddButtonClick}>등록</AddCommentButton>
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
  height: 4rem;
  font-size: 1.6rem;
  border: 0.1rem solid rgba(0, 0, 0, 0.4);
  border-radius: 1rem;
  padding: 1rem 7rem 1rem 1rem;
  resize: none;
  overflow: hidden;

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-size: 1.4rem;
  }
`

const AddCommentButton = styled.button`
  position: absolute;
  bottom: 0.5rem;
  right: 1rem;
  width: 5rem;
  height: 3rem;
  border: none;
  border-radius: 0.6rem;
  color: #f5f5f5;
  background-color: black;
  margin-left: -6rem;
  cursor: pointer;
`

export default CommentInput
