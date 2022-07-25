import styled from '@emotion/styled'
import PostCard from '../../src/components/PostCard'

const PostCardDummy = Array.from({ length: 5 }, (_, idx) => {
  return {
    id: idx.toString(),
    title: '참치마요',
    imageUrl: 'https://via.placeholder.com/300x150',
    avatarImageUrl: 'https://via.placeholder.com/50',
    author: 'Lee',
    likes: 10,
    comments: 20
  }
})

const Main = () => {
  return (
    <TempLayout>
      {PostCardDummy.map((cardData) => {
        return (
          <PostCard
            id={cardData.id}
            key={cardData.id}
            title={cardData.title}
            imageUrl={cardData.imageUrl}
            avatarImageUrl={cardData.avatarImageUrl}
            author={cardData.author}
            likes={cardData.likes}
            comments={cardData.comments}
          />
        )
      })}
    </TempLayout>
  )
}

const TempLayout = styled.div`
  position: relative;
  left: 20%;
  width: 37.5rem;
  height: 81.2rem;
  border: 1px solid black;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`

export default Main
