import styled from '@emotion/styled'
import { Avatar } from '@components/common'
import { IoMdHeart } from 'react-icons/io'
import { BiComment } from 'react-icons/bi'
import { RefObject } from 'react'
import theme from '@constants/theme'
import { NO_IMAGE } from '@constants/image'
import useIntersectionObserver from '@hooks/common/useIntersectionObserver'
import { useState } from 'react'
import { setLocalStorageItem } from '@utils/localStorage'

interface Props {
  title: string
  franchise: string
  imageUrl: string
  avatarImageUrl: string
  author: string
  likes: number
  comments: number
  divRef: RefObject<HTMLDivElement> | null
}

const MenuCard = ({
  title,
  franchise,
  imageUrl,
  avatarImageUrl,
  author,
  likes,
  comments,
  divRef
}: Props) => {
  if (!imageUrl) {
    imageUrl = NO_IMAGE
  }

  const [isObserved, setIsObserved] = useState(false)

  const imageRef = useIntersectionObserver(
    async (entry, observer) => {
      observer.unobserve(entry.target)
      setIsObserved(true)
    },
    { threshold: 0.5, rootMargin: '-65px 0px' }
  )

  const handleClick = () => {
    if (typeof window === undefined) return
    setLocalStorageItem('scrollY', window.scrollY.toString())
  }

  return (
    <CardContainer ref={divRef} onClick={handleClick}>
      <Img src={isObserved ? imageUrl : NO_IMAGE} ref={imageRef} />
      <CardInfo>
        <CardHeader>
          <Franchise>{franchise}</Franchise>
          <Title>{title}</Title>
        </CardHeader>
        <CardFooter>
          <UserInfoWrapper>
            <Avatar
              size={2.4}
              src={isObserved ? avatarImageUrl : undefined}
              isLoading={false}
            />
            <Author>{author}</Author>
          </UserInfoWrapper>
          <PostInfoWrapper>
            <IoMdHeart color={theme.color.mainPink} size={16} />
            <Text>{likes}</Text>
            <BiComment size={16} />
            <Text>{comments}</Text>
          </PostInfoWrapper>
        </CardFooter>
      </CardInfo>
    </CardContainer>
  )
}

const CardInfo = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
`

const CardContainer = styled.div`
  display: flex;
  width: 100%;
  height: 15rem;
  border-radius: 1rem;
  gap: 1rem;
  cursor: pointer;
`

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0.5rem;
`
const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem;
`

const Franchise = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${theme.color.franchiseLight};
`

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  user-select: none;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const Img = styled.div<{ src: string }>`
  min-width: 15rem;
  height: 15rem;
  background: ${({ src }) => `no-repeat top center url(${src})`};
  background-size: cover;
  border-radius: 1rem;
`

const UserInfoWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
`

const Author = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  user-select: none;
`

const PostInfoWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.4rem;
`

const Text = styled.div`
  font-size: 1.6rem;
  user-select: none;
`

export default MenuCard
