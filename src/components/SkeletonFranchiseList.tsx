import theme from '@constants/theme'
import styled from '@emotion/styled'

const SkeletonFranchiseList = () => {
  return (
    <BoxContainer>
      {Array.from({ length: 5 }).map((_, idx) => (
        <BoxWrapper key={idx}>
          <SkeletonFranchiseInfo />
        </BoxWrapper>
      ))}
    </BoxContainer>
  )
}

const SkeletonFranchiseInfo = () => {
  return (
    <FranchiseWrapper>
      <SkeletonAvatar />
      <SkeletonName />
    </FranchiseWrapper>
  )
}

const BoxContainer = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 8.5rem;
`

const BoxWrapper = styled.li`
  border-bottom: 1px solid ${theme.color.borderLight};
`

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

const SkeletonAvatar = styled(SkeletonDiv)`
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
`

const SkeletonName = styled(SkeletonDiv)`
  width: 10rem;
  height: 2rem;
  border-radius: 0.5rem;
`

const FranchiseWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
`

export default SkeletonFranchiseList
