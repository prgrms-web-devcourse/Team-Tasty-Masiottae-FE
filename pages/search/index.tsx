import styled from '@emotion/styled'
import { useFranchiseList } from '@hooks/queries/useFranchiseList'
import FranchiseInfoList from '@components/FranchiseInfoList'
import SkeletonFranchiseList from '@components/SkeletonFranchiseList'

const Category = () => {
  const { franchiseList, isLoading } = useFranchiseList()
  return (
    <>
      <FixedWrapper>
        <InnerWrapper>
          <Header>카테고리</Header>
        </InnerWrapper>
      </FixedWrapper>
      {isLoading ? (
        <SkeletonFranchiseList />
      ) : (
        <FranchiseInfoList franchiseList={franchiseList || []} />
      )}
    </>
  )
}

const FixedWrapper = styled.div`
  position: fixed;
  top: 6.4rem;
  left: 0;
  width: 100%;
`

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 33.5rem;
  max-width: 46rem;
  height: 6.4rem;
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

export default Category
