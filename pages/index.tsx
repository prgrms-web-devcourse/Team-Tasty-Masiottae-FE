import type { NextPage } from 'next'
import MenuCard from '@components/MenuCard'
import { useState } from 'react'
import useIntersectionObserver from '@hooks/useIntersectionObserver'
import { Card, PostCardDummy } from '@constants/cardData'
import styled from '@emotion/styled'

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
    <CardListWrapper>
      {cards.map((cardData, idx) => {
        return (
          <MenuCard
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
    </CardListWrapper>
  )
}

const CardListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`

export default Home
