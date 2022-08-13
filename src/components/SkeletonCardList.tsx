import styled from '@emotion/styled'
import { IoMdHeart } from 'react-icons/io'
import { BiComment } from 'react-icons/bi'
import theme from '@constants/theme'

const SkeletonCardList = () => {
  return (
    <Container>
      <SkeletonMenuCard />
      <SkeletonMenuCard />
      <SkeletonMenuCard />
      <SkeletonMenuCard />
    </Container>
  )
}

export const SkeletonMenuCard = () => {
  return (
    <CardContainer>
      <ImageSkeleton />
      <CardInfo>
        <CardHeader>
          <FranchiseSkeleton />
          <TitleSkeleton />
        </CardHeader>
        <CardFooter>
          <UserInfoWrapper>
            <AvatarSkeleton />
            <AuthorSkeleton />
          </UserInfoWrapper>
          <PostInfoWrapper>
            <IoMdHeart color={theme.color.fontLight} size={24} />
            <TextSkeleton />
            <BiComment color={theme.color.fontLight} size={24} />
            <TextSkeleton />
          </PostInfoWrapper>
        </CardFooter>
      </CardInfo>
    </CardContainer>
  )
}

const SkeletonDiv = styled.div`
  border-radius: 1rem;
  background: #f2f2f2;
  overflow: hidden;
  position: relative;

  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: skeleton-gradient 1.5s infinite ease-in-out;
  }
`

const Flex = styled.div`
  display: flex;
`

const Container = styled(Flex)`
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
`

const UserInfoWrapper = styled(Flex)`
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
`

const PostInfoWrapper = styled(Flex)`
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
`

const CardHeader = styled(Flex)`
  flex-direction: column;
  gap: 0.3rem;
  padding: 0.5rem;
`
const CardFooter = styled(Flex)`
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem;
`

const CardContainer = styled(Flex)`
  width: 100%;
  border-radius: 1rem;
  gap: 1rem;
  cursor: pointer;
`

const CardInfo = styled(Flex)`
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
`

const AvatarSkeleton = styled(SkeletonDiv)`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
`

const TextSkeleton = styled(SkeletonDiv)`
  width: 3rem;
  height: 2rem;
  border-radius: 0.5rem;
`

const AuthorSkeleton = styled(SkeletonDiv)`
  width: 7rem;
  height: 2rem;
  border-radius: 0.5rem;
`

const ImageSkeleton = styled(SkeletonDiv)`
  min-width: 15rem;
  height: 15rem;
`

const FranchiseSkeleton = styled(SkeletonDiv)`
  width: 5rem;
  height: 2rem;
  border-radius: 0.5rem;
`

const TitleSkeleton = styled(SkeletonDiv)`
  width: 15rem;
  height: 3rem;
  border-radius: 0.5rem;
`

export default SkeletonCardList
