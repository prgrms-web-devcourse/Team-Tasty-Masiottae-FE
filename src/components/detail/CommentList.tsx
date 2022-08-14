import React, { Fragment, useState } from 'react'
import styled from '@emotion/styled'
import Modal from '@components/Modal'
import { Comment, User } from '@interfaces'
import { BiDotsHorizontalRounded, BiTrash } from 'react-icons/bi'
import { getDate } from '@utils/getDate'
import Avatar from '@components/Avatar'
import { useDeleteCommentMutation } from '@hooks/mutations/useDeleteCommentMutation'

interface Props {
  user: User
  commentList: Comment[]
}

const CommentList = ({ user, commentList }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [commentId, setCommentId] = useState(0)
  const { mutate: deleteComment } = useDeleteCommentMutation()

  const handleCommentModalClick = (id: number) => {
    setIsModalOpen(true)
    setCommentId(id)
  }

  const handleCommentModalClose = () => {
    setIsModalOpen(false)
  }

  const handleDeleteCommentClick = () => {
    deleteComment(
      {
        commentId
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
      <CommentListContainer>
        <CommnetCountText>댓글 {commentList.length}개</CommnetCountText>
        {commentList.map(({ id, author, createdAt, comment }) => (
          <Fragment key={id}>
            <CommentWrapper>
              <Avatar size={4} src={author.image} isLoading={false} />
              <CommentContainer>
                <CommentHeader>
                  <NameAndDateWrapper>
                    <UserNameText>{author.nickName}</UserNameText>
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
                <CommentText>{comment}</CommentText>
              </CommentContainer>
            </CommentWrapper>
          </Fragment>
        ))}
      </CommentListContainer>
      <Modal
        visible={isModalOpen}
        onClose={handleCommentModalClose}
        option="drawer"
      >
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

const CommentListContainer = styled.div``

const CommnetCountText = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 2rem;
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
`

const ModalItem = styled(Flex)`
  font-size: 2rem;
  justify-content: center;
  width: 100vw;
  max-width: 50rem;
  cursor: pointer;

  &:not(:first-of-type) {
    margin-top: 1rem;
  }
`

export default CommentList
