import React, { Fragment, useState } from 'react'
import styled from '@emotion/styled'
import Modal from '@components/Modal'
import { Comment, User } from '@interfaces'
import { BiTrash } from 'react-icons/bi'

interface Props {
  user: User
  commentList: Comment[]
}

const CommentList = ({ user, commentList }: Props) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleDeleteCommentClick = () => {
    setIsDeleteModalOpen(true)
  }

  const handleDeleteCommentClose = () => {
    setIsDeleteModalOpen(false)
  }

  const getDate = (createdAt: string) => {
    const month = createdAt.slice(5, 7) + '월'
    const day = createdAt.slice(8, 10) + '일'
    return month + day
  }

  return (
    <CommentListContainer>
      <CommnetCountText>댓글 {commentList.length} 개</CommnetCountText>
      {commentList.map(({ id, author, createdAt, comment }) => (
        <Fragment key={id}>
          <CommentWrapper>
            <Avatar src={author.image} />
            <CommentContainer>
              <CommentHeaderWrapper>
                <UserNameText>{author.nickName}</UserNameText>
                <DateText>{getDate(createdAt)}</DateText>
              </CommentHeaderWrapper>
              <CommentBox>
                <CommentText>{comment}</CommentText>
                <ButtonWrapper onClick={handleDeleteCommentClick}>
                  {user.id === author.id && (
                    <>
                      <DeleteButton size={20} />
                      <Modal
                        visible={isDeleteModalOpen}
                        onClose={handleDeleteCommentClose}
                        option="drawer"
                      >
                        <ModalItem>삭제</ModalItem>
                      </Modal>
                    </>
                  )}
                </ButtonWrapper>
              </CommentBox>
            </CommentContainer>
          </CommentWrapper>
        </Fragment>
      ))}
    </CommentListContainer>
  )
}

const Flex = styled.div`
  display: flex;
`

const CommentListContainer = styled.div``

const CommnetCountText = styled.div`
  font-size: 1.4rem;
  margin-bottom: 2rem;
`

const CommentWrapper = styled(Flex)`
  margin-bottom: 1rem;
`

const Avatar = styled.img`
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
`

const CommentContainer = styled.div`
  width: 100%;
`

const CommentHeaderWrapper = styled(Flex)`
  align-items: center;
  margin-bottom: 0.4rem;
`

const UserNameText = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
`

const DateText = styled.span`
  margin-left: 1rem;
`

const CommentBox = styled(Flex)`
  justify-content: space-between;
  font-size: 1.4rem;
  min-width: 100%;
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.03);
`

const CommentText = styled.div`
  padding-right: 2rem;
  width: 100%;
`

const ButtonWrapper = styled.div`
  justify-self: flex-end;
  margin-left: 0.5rem;
  cursor: pointer;
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

const DeleteButton = styled(BiTrash)``

export default CommentList
