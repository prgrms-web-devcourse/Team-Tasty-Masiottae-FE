import type { NextPage } from 'next'
import PostCard from '@components/PostCard'
import { useState } from 'react'
import useIntersectionObserver from '../src/hooks/useIntersectionObserver'

const Card = {
  id: '12341324',
  title: '참치마요',
  imageUrl: 'https://via.placeholder.com/300x150',
  avatarImageUrl: 'https://via.placeholder.com/50',
  author: 'Lee',
  likes: 10,
  comments: 20
}

const PostCardDummy = Array.from({ length: 4 }, (_, idx) => {
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

const Home: NextPage = () => {
  const [cards, setCards] = useState(PostCardDummy)
  const ref = useIntersectionObserver(
    async (entry, observer) => {
      observer.unobserve(entry.target)
      setCards([...cards, Card])
    },
    { threshold: 0.5 }
  )

  return (
    <>
      {cards.map((cardData, idx) => {
        return (
          <PostCard
            id={cardData.id}
            key={idx.toString()}
            title={cardData.title}
            imageUrl={cardData.imageUrl}
            avatarImageUrl={cardData.avatarImageUrl}
            author={cardData.author}
            likes={cardData.likes}
            comments={cardData.comments}
            divRef={cards.length === idx + 1 ? ref : null}
          />
        )
      })}
    </>
  )

export default Home
