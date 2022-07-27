export const Card = {
  id: '12341324',
  title: '참치마요',
  imageUrl: 'https://via.placeholder.com/300x150',
  avatarImageUrl: 'https://via.placeholder.com/50',
  author: 'Lee',
  likes: 10,
  comments: 20
}

export const PostCardDummy = Array.from({ length: 4 }, (_, idx) => {
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
