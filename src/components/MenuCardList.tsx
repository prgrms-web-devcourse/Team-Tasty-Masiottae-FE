import { RefObject } from 'react'
import { Menu } from '@interfaces'
import styled from '@emotion/styled'
import Link from 'next/link'
import MenuCard from '@components/MenuCard'
import theme from '@constants/theme'

interface Props {
  menuList: Menu[]
  divRef: RefObject<HTMLDivElement> | null
}

const MenuCardList = ({ menuList, divRef }: Props) => {
  return (
    <Container>
      {menuList.length === 0 ? (
        <NoResultContainer>
          <NoResult>검색 결과가 없습니다!</NoResult>
        </NoResultContainer>
      ) : (
        menuList.map((menu, idx) => (
          <MenuCardWrapper key={idx}>
            <Link href={`/detail/${menu.id}`}>
              <a>
                <MenuCard
                  key={idx}
                  title={menu.title}
                  franchise={menu.franchise.name}
                  imageUrl={menu.image}
                  avatarImageUrl={menu.author.image}
                  author={menu.author.nickName}
                  likes={menu.likes}
                  comments={menu.comments || 0}
                  divRef={menuList.length === idx + 1 ? divRef : null}
                />
              </a>
            </Link>
          </MenuCardWrapper>
        ))
      )}
    </Container>
  )
}

const NoResultContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30rem;
`

const NoResult = styled.div`
  font-size: 2.8rem;
  font-weight: 700;
  color: ${theme.color.fontLight};
`

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  margin-top: 0.5rem;
`

const MenuCardWrapper = styled.li``

export default MenuCardList
