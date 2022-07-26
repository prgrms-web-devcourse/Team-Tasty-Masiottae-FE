import PostCard from '@components/PostCard'

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
    <>
      {PostCardDummy.map((cardData) => (
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
      ))}
    </>
  )
}

export default Main
