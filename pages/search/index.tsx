import CategoryBox from '@components/CategoryBox'
import styled from '@emotion/styled'
import Link from 'next/link'

const CATEGORY_LIST = [
  '전체',
  '스타벅스',
  '공차',
  '맥도날드',
  '서브웨이',
  '버거킹'
]

const Category = () => {
  return (
    <>
      <Header>카테고리</Header>
      <BoxContainer>
        {CATEGORY_LIST.map((val) => (
          <BoxWrapper key={val}>
            <Link href={`/search/${val}`}>
              <a>
                <CategoryBox imageUrl="https://picsum.photos/seed/picsum/120/120">
                  {val}
                </CategoryBox>
              </a>
            </Link>
          </BoxWrapper>
        ))}
      </BoxContainer>
    </>
  )
}

const Header = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
`

const BoxContainer = styled.ul`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
`

const BoxWrapper = styled.li``

export default Category
