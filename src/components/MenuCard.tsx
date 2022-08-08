import styled from '@emotion/styled'
import Avatar from './Avatar'
import { IoMdHeart } from 'react-icons/io'
import { BiComment } from 'react-icons/bi'
import { RefObject } from 'react'
import theme from '@constants/theme'

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

const IMAGE_ALT = 'NO IMAGE'
const extensions = ['jpg', 'png', 'jpeg', 'jfif']

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
  if (!imageUrl) imageUrl = 'https://via.placeholder.com/160'

  if (imageUrl) {
    if (!extensions.includes(imageUrl.split('.').slice(-1)[0])) {
      imageUrl = 'https://via.placeholder.com/160'
    }
  }

  return (
    <CardContainer ref={divRef}>
      <Image src={imageUrl} alt={IMAGE_ALT} />
      <CardInfo>
        <CardHeader>
          <Franchise>{franchise}</Franchise>
          <Title>{title}</Title>
        </CardHeader>
        <CardFooter>
          <UserInfoWrapper>
            <Avatar size={4} src={avatarImageUrl} isLoading={false} />
            <Author>{author}</Author>
          </UserInfoWrapper>
          <PostInfoWrapper>
            <IoMdHeart color={theme.color.mainPink} size={24} />
            <Text>{likes}</Text>
            <BiComment size={24} />
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
  font-size: 1.6rem;
  font-weight: 700;
  color: ${theme.color.franchiseLight};
`

const Title = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  user-select: none;
`

const Image = styled.img`
  width: 16rem;
  height: 16rem;
  border-radius: 1rem;
  object-fit: cover;
`

const UserInfoWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
`

const Author = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  user-select: none;
`

const PostInfoWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
`

const Text = styled.div`
  font-size: 2rem;
  user-select: none;
`

export default MenuCard
