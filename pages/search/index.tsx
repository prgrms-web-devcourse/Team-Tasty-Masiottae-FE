import styled from '@emotion/styled'
import Link from 'next/link'
import { useFranchiseList } from '@hooks/queries/useFranchiseList'
import Avatar from '@components/Avatar'
import theme from '@constants/theme'

const Category = () => {
  const { franchiseList, isLoading } = useFranchiseList()
  return (
    <>
      <FixedWrapper>
        <InnerWrapper>
          <Header>카테고리</Header>
        </InnerWrapper>
      </FixedWrapper>

      <BoxContainer>
        <Link href={`/search/전체`}>
          <a>
            <FranchiseWrapper>
              <Avatar size={7} src={'/ALL.png'} isLoading={isLoading} />
              <FranchiseName>전체</FranchiseName>
            </FranchiseWrapper>
          </a>
        </Link>
        {franchiseList?.map((franchise) => (
          <BoxWrapper key={franchise.id}>
            <Link href={`/search/${franchise.name}`}>
              <a>
                <FranchiseWrapper>
                  <Avatar
                    size={7}
                    src={franchise.image}
                    isLoading={isLoading}
                  />
                  <FranchiseName>{franchise.name}</FranchiseName>
                </FranchiseWrapper>
              </a>
            </Link>
          </BoxWrapper>
        ))}
      </BoxContainer>
    </>
  )
}

const FixedWrapper = styled.div`
  position: fixed;
  left: 0;
  width: 100%;
`

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 33.5rem;
  max-width: 46rem;
  width: 100%;
  background-color: white;
  margin: 0 auto;
  padding-bottom: 0.5rem;
  box-sizing: border-box;

  @media screen and (max-width: 31.25rem) {
    padding: 0 2rem;
  }
`

const Header = styled.h2`
  display: flex;
  align-items: center;
  font-size: 2.4rem;
  padding: 0.5rem;
`

const BoxContainer = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 8.5rem;
`

const FranchiseName = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
`

const FranchiseWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid ${theme.color.borderLight};
`

const BoxWrapper = styled.li``

export default Category
