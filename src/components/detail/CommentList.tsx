import styled from '@emotion/styled'
import { Comment, User } from '@interfaces'
import CommentBox from '@components/detail/CommentBox'

interface Props {
  user: User
  commentList: Comment[]
}

const CommentList = ({ user, commentList }: Props) => {
  return (
    <CommentListContainer>
      <CommnetCountText>댓글 {commentList.length}개</CommnetCountText>
      {commentList.map(({ id, author, createdAt, comment }) => (
        <CommentBox
          key={id}
          id={id}
          author={author}
          createdAt={createdAt}
          comment={comment}
          user={user}
        />
      ))}
    </CommentListContainer>
  )
}

const CommentListContainer = styled.div``

const CommnetCountText = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 2rem;
`

export default CommentList
