import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import styled from '@emotion/styled'
import { User } from '@interfaces'
import { Avatar, Modal } from '@components/common'
import { BiDotsHorizontalRounded, BiTrash } from 'react-icons/bi'
import { useRouter } from 'next/router'
import { getDate } from '@utils/getDate'
import { BsFillPencilFill } from 'react-icons/bs'
import { useDeleteCommentMutation } from '@hooks/mutations/useDeleteCommentMutation'
import { usePatchCommentMutation } from '@hooks/mutations/usePatchCommentMutation'
import { AiOutlineClose } from 'react-icons/ai'

interface Props {
  id: number
  author: User
  createdAt: string
  comment: string
  user: User
}

const CommentBox = ({ id, author, createdAt, comment, user }: Props) => {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCommentId, setSelectedCommentId] = useState(0)
  const [newComment, setNewComment] = useState(comment)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { mutate: deleteComment } = useDeleteCommentMutation()
  const { mutate: patchComment } = usePatchCommentMutation()

  const handleCommentModalClick = (id: number) => {
    setIsModalOpen(true)
    setSelectedCommentId(id)
  }

  const handleCommentModalClose = () => {
    setIsModalOpen(false)
  }

  const handleUserClick = () => {
    router.push(`/user/${author.id}`)
  }

  const handleCommentChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (textareaRef.current === null) {
        return
      }

      textareaRef.current.style.height = '4.8rem'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'

      setNewComment(e.target.value)
    },
    []
  )

  const handleChangeButtonClick = () => {
    patchComment(
      {
        commentId: selectedCommentId,
        comment: newComment
      },
      {
        onSuccess: () => {
          setIsEditing(false)
        }
      }
    )
  }

  const handleCancelEditingClick = () => {
    setIsEditing(false)
  }

  const handleEditCommentClick = () => {
    setIsEditing(true)
    setIsModalOpen(false)
  }

  useEffect(() => {
    const element = textareaRef.current
    if (!element) {
      return
    }
    const end = element.value.length

    element.setSelectionRange(end, end)
    element.focus()
  }, [isEditing])

  const handleDeleteCommentClick = () => {
    deleteComment(
      {
        commentId: selectedCommentId
      },
      {
        onSuccess: () => {
          setIsModalOpen(false)
        }
      }
    )
  }

  return (
    <>
      <CommentWrapper>
        <Avatar
          size={4}
          src={author.image}
          isLoading={false}
          onClick={handleUserClick}
        />
        <CommentContainer>
          {isEditing ? (
            <TextareaWrapper>
              <CommentWriteContainer>
                <Textarea
                  ref={textareaRef}
                  value={newComment}
                  maxLength={80}
                  onChange={handleCommentChange}
                />
                <AddCommentButton onClick={handleChangeButtonClick}>
                  수정
                </AddCommentButton>
              </CommentWriteContainer>
              <CancelButton size={20} onClick={handleCancelEditingClick} />
            </TextareaWrapper>
          ) : (
            <>
              <CommentHeader>
                <NameAndDateWrapper>
                  <UserNameText onClick={handleUserClick}>
                    {author.nickName}
                  </UserNameText>
                  <DateText>{getDate(createdAt)}</DateText>
                </NameAndDateWrapper>
                {user.id === author.id && (
                  <>
                    <Dots
                      size={20}
                      onClick={() => handleCommentModalClick(id)}
                    />
                  </>
                )}
              </CommentHeader>
              <CommentText>{newComment}</CommentText>
            </>
          )}
        </CommentContainer>
      </CommentWrapper>
      <Modal
        visible={isModalOpen}
        onClose={handleCommentModalClose}
        option="drawer"
      >
        <ModalItem onClick={handleEditCommentClick}>
          <IconWrapper>
            <BsFillPencilFill size={20} />
          </IconWrapper>
          수정
        </ModalItem>
        <ModalItem onClick={handleDeleteCommentClick}>
          <BiTrash size={25} />
          삭제
        </ModalItem>
      </Modal>
    </>
  )
}

const Flex = styled.div`
  display: flex;
`

const CommentWrapper = styled(Flex)`
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 0.1rem solid #f1f1f1;
`

const CommentContainer = styled.div`
  width: calc(100% - 4rem);
  margin-left: 1rem;
  padding-bottom: 0.8rem;
`

const TextareaWrapper = styled(Flex)`
  justify-content: space-between;
  align-items: center;
`

const CommentWriteContainer = styled(Flex)`
  width: 90%;
  align-items: center;
  position: relative;
`

const Textarea = styled.textarea`
  width: 100%;
  height: 4.8rem;
  min-height: 4.8rem;
  font-size: 1.6rem;
  border: 0.1rem solid ${({ theme }) => theme.color.borderBasic};
  border-radius: 1rem;
  padding: 1.4rem 6rem 1rem 1rem;
  resize: none;

  &:focus {
    outline: none;
    border: 0.1rem solid black;
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

const CancelButton = styled(AiOutlineClose)`
  cursor: pointer;
`

const CommentHeader = styled(Flex)`
  justify-content: space-between;
  margin-bottom: 0.4rem;
`

const NameAndDateWrapper = styled(Flex)`
  align-items: center;
`

const UserNameText = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  cursor: pointer;
`

const DateText = styled.span`
  margin-left: 1.4rem;
  color: #a3a3a3;
`

const Dots = styled(BiDotsHorizontalRounded)`
  justify-self: end;
  cursor: pointer;
`

const CommentText = styled.div`
  font-size: 1.6rem;
  word-break: break-all;
`

const IconWrapper = styled(Flex)`
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
`

const ModalItem = styled(Flex)`
  align-items: center;
  height: 5rem;
  font-size: 2rem;
  justify-content: center;
  width: 100vw;
  max-width: 50rem;
  cursor: pointer;

  &:not(:first-of-type) {
    margin-top: 1rem;
  }
`

export default CommentBox
