import React, { Fragment, useState } from 'react'
import styled from '@emotion/styled'
import Modal from '@components/Modal'
import { Comment, User } from '@interfaces'
import { BiDotsHorizontalRounded, BiTrash } from 'react-icons/bi'
import { getDate } from '@utils/getDate'

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

  return (
    <CommentListContainer>
      <CommnetCountText>댓글 {commentList.length} 개</CommnetCountText>
      {commentList.map(({ id, author, createdAt, comment }) => (
        <Fragment key={id}>
          <CommentWrapper>
            <Avatar src={author.image} />
            <CommentContainer>
              <CommentHeader>
                <NameAndDateWrapper>
                  <UserNameText>{author.nickName}</UserNameText>
                  <DateText>{getDate(createdAt)}</DateText>
                </NameAndDateWrapper>
                {user.id === author.id && (
                  <>
                    <Dots size={20} onClick={handleDeleteCommentClick} />
                    <Modal
                      visible={isDeleteModalOpen}
                      onClose={handleDeleteCommentClose}
                      option="drawer"
                    >
                      <ModalItem>
                        <BiTrash size={25} />
                        삭제
                      </ModalItem>
                    </Modal>
                  </>
                )}
              </CommentHeader>
              <CommentBox>
                <CommentText>{comment}</CommentText>
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

const CommentHeader = styled(Flex)`
  justify-content: space-between;
  margin-bottom: 0.4rem;
`

const NameAndDateWrapper = styled(Flex)`
  align-items: center;
`

const UserNameText = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
`

const DateText = styled.span`
  margin-left: 1rem;
`

const Dots = styled(BiDotsHorizontalRounded)`
  justify-self: end;
  cursor: pointer;
`

const CommentBox = styled(Flex)`
  justify-content: space-evenly;
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
