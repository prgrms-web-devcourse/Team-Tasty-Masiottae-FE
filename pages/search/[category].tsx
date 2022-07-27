import Input from '@components/Input'
import PostCard from '@components/PostCard'
import styled from '@emotion/styled'
import useIntersectionObserver from '@hooks/useIntersectionObserver'
import { useRouter } from 'next/router'
import { useState } from 'react'

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

const Search = () => {
  const [cards, setCards] = useState(PostCardDummy)
  const ref = useIntersectionObserver(
    async (entry, observer) => {
      observer.unobserve(entry.target)
      setCards([...cards, Card])
    },
    { threshold: 0.5 }
  )
  const router = useRouter()
  const { category } = router.query
  return (
    <>
      <Container>
        <Input height={5} type="text" placeholder="검색해라" />
        <CategoryHeader>스타벅스</CategoryHeader>
        <Wrapper>
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
        </Wrapper>
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  gap: 1rem;
  height: 100%;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: scroll;
  row-gap: 1rem;

  ::-webkit-scrollbar {
    display: none;
  }
`

const CategoryHeader = styled.div`
  height: 8rem;
  font-size: 2rem;
  text-align: center;
  padding: 3rem;
  background-color: gray;
  box-sizing: border-box;
  user-select: none;
`

export default Search
