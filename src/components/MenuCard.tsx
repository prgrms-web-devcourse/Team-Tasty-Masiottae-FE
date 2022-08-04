import styled from '@emotion/styled'
import Avatar from './Avatar'
import { IoMdHeartEmpty } from 'react-icons/io'
import { BiComment } from 'react-icons/bi'
import { RefObject } from 'react'

interface Props {
  title: string
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
  imageUrl,
  avatarImageUrl,
  author,
  likes,
  comments,
  divRef
}: Props) => {
  if (!imageUrl) imageUrl = 'https://via.placeholder.com/300x150'

  if (imageUrl) {
    if (!extensions.includes(imageUrl.split('.').slice(-1)[0])) {
      imageUrl = 'https://via.placeholder.com/300x150'
    }
  }

  return (
    <CardContainer ref={divRef}>
      <Title>{title}</Title>
      <Image src={imageUrl} alt={IMAGE_ALT} />
      <CardFooter>
        <UserInfoWrapper>
          <Avatar size={5} src={avatarImageUrl} isLoading={false} />
          <Author>{author}</Author>
        </UserInfoWrapper>
        <PostInfoWrapper>
          <IoMdHeartEmpty size={20} />
          <Text>{likes}</Text>
          <BiComment size={20} />
          <Text>{comments}</Text>
        </PostInfoWrapper>
      </CardFooter>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  width: 100%;
  border-radius: 1rem;
  box-shadow: 0 0.25rem 0.1rem rgba(55, 31, 31, 0.2);
  cursor: pointer;
`

const Title = styled.div`
  padding: 2rem;
  font-size: 2rem;
  text-align: center;
  box-sizing: border-box;
  user-select: none;
`

const Image = styled.img`
  width: 100%;
  max-height: 20rem;
  object-fit: cover;
`

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
`

const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  box-sizing: border-box;
`

const Author = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  user-select: none;
`

const PostInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  box-sizing: border-box;
`

const Text = styled.div`
  font-size: 2rem;
  user-select: none;
`

export default MenuCard
