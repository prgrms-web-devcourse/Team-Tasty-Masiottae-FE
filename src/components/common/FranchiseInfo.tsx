import styled from '@emotion/styled'
import Avatar from './Avatar'
import { Franchise } from '@interfaces'

interface Props {
  franchise?: Franchise
}

const FranchiseInfo = ({ franchise }: Props) => {
  return (
    <FranchiseWrapper>
      <Avatar size={7} src={franchise?.image} isLoading={false} />
      <FranchiseName>{franchise?.name}</FranchiseName>
    </FranchiseWrapper>
  )
}

const FranchiseName = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
`

const FranchiseWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
`

export default FranchiseInfo
