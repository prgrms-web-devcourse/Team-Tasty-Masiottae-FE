import theme from '@constants/theme'
import styled from '@emotion/styled'
import Link from 'next/link'
import { Franchise } from '@interfaces'
import FranchiseInfo from './FranchiseInfo'

interface Props {
  franchiseList: Franchise[]
}

const FranchiseInfoList = ({ franchiseList }: Props) => {
  return (
    <BoxContainer>
      <BoxWrapper>
        <Link href={`/search/0`}>
          <a>
            <FranchiseInfo
              franchise={{ id: 0, name: '전체', image: '/ALL.png' }}
            />
          </a>
        </Link>
      </BoxWrapper>

      {franchiseList?.map((franchise) => (
        <BoxWrapper key={franchise.id}>
          <Link href={`/search/${franchise.id}`}>
            <a>
              <FranchiseInfo franchise={franchise} />
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
  padding-top: 6.4rem;
`

const BoxWrapper = styled.li`
  border-bottom: 1px solid ${theme.color.borderLight};
`

export default FranchiseInfoList
