import theme from '@constants/theme'
import styled from '@emotion/styled'
import Link from 'next/link'
import { Franchise } from '../interfaces/index'
import FranchiseInfo from './FranchiseInfo'

interface Props {
  franchiseList: Franchise[]
  isLoading: boolean
}

const FranchiseInfoList = ({ franchiseList, isLoading }: Props) => {
  return (
    <BoxContainer>
      <BoxWrapper>
        <Link href={`/search/전체`}>
          <a>
            <FranchiseInfo
              franchise={{ id: 0, name: '전체', image: '/ALL.png' }}
              isLoading={isLoading}
            />
          </a>
        </Link>
      </BoxWrapper>

      {franchiseList?.map((franchise) => (
        <BoxWrapper key={franchise.id}>
          <Link href={`/search/${franchise.name}`}>
            <a>
              <FranchiseInfo franchise={franchise} isLoading={isLoading} />
            </a>
          </Link>
        </BoxWrapper>
      ))}
    </BoxContainer>
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

export default FranchiseInfoList
