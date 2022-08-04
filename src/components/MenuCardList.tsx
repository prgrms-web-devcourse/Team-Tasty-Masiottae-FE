import { RefObject } from 'react'
import { Menu } from '@interfaces'
import styled from '@emotion/styled'
import Link from 'next/link'
import MenuCard from '@components/MenuCard'

interface Props {
  menuList: Menu[]
  divRef: RefObject<HTMLDivElement> | null
}

const MenuCardList = ({ menuList, divRef }: Props) => {
  return (
    <Container>
      {menuList.map((menu, idx) => {
        return (
          <MenuCardWrapper key={idx}>
            <Link href={`/detail/${menu.id}`}>
              <a>
                <MenuCard
                  key={idx}
                  title={menu.title}
                  imageUrl={menu.image}
                  avatarImageUrl={menu.author.image}
                  author={menu.author.nickName}
                  likes={menu.likes}
                  comments={10}
                  divRef={menuList.length === idx + 1 ? divRef : null}
                />
              </a>
            </Link>
          </MenuCardWrapper>
        )
      })}
    </Container>
  )
}

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`

const MenuCardWrapper = styled.li``

export default MenuCardList
