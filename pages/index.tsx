import type { NextPage } from 'next'
import PostCard from '@components/PostCard'
import { useState } from 'react'
import useIntersectionObserver from '@hooks/useIntersectionObserver'
import { Card, PostCardDummy } from '@constants/cardData'

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
            key={idx}
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
}

export default Home
