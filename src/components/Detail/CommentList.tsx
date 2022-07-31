import Modal from '@components/Modal'
import styled from '@emotion/styled'
import React, { Fragment, useState } from 'react'
import { BiTrash } from 'react-icons/bi'
import commentListDummy from './commentsDummy.json'
import userDummy from './userDummy.json'

const CommentList = () => {
  const [user, setUser] = useState(userDummy)
  const [commentList, setCommentList] = useState(commentListDummy)
  console.log(user)
  console.log(commentList)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleDeleteCommentClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setIsDeleteModalOpen(true)
  }

  const handleDeleteCommentClose = () => {
    setIsDeleteModalOpen(false)
  }

  return (
    <CommentListContainer>
      <CommnetCountText>댓글 {commentList.length} 개</CommnetCountText>
      {commentList.map((comment) => (
        <Fragment key={comment.id}>
          <CommentWrapper>
            <Avatar src={comment.author.profileImageUrl} />
            <CommentContainer>
              <UserNameText>{comment.author.name}</UserNameText>
              <Comment>
                <CommentText>{comment.comment}</CommentText>
                <ButtonWrapper onClick={handleDeleteCommentClick}>
                  {user.id === comment.author.id && (
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
              </Comment>
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

const UserNameText = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`

const Comment = styled(Flex)`
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
