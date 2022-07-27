import styled from '@emotion/styled'
import Avatar from './Avatar'
import { IoMdHeartEmpty } from 'react-icons/io'
import { BiComment } from 'react-icons/bi'
import Link from 'next/link'
import { RefObject } from 'react'

interface Props {
  id: string
  title: string
  imageUrl: string
  avatarImageUrl: string
  author: string
  likes: number
  comments: number
  divRef: RefObject<HTMLDivElement> | null
}

const IMAGE_ALT = 'NO IMAGE'

const PostCard = ({
  id,
  title,
  imageUrl,
  avatarImageUrl,
  author,
  likes,
  comments,
  divRef
}: Props) => {
  return (
    <Link href={`/detail/${id}`}>
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
    </Link>
  )
}

const CardContainer = styled.div`
  width: 100%;
  cursor: pointer;
`

const Title = styled.div`
  padding: 2rem;
  font-size: 2rem;
  text-align: center;
  box-sizing: border-box;
`

const Image = styled.img`
  width: 100%;
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
`

export default PostCard
