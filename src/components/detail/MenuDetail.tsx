import React, { useState } from 'react'
import styled from '@emotion/styled'
import Modal from '@components/Modal'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { BiDotsVerticalRounded, BiTrash } from 'react-icons/bi'
import { Menu } from '@interfaces'
import Avatar from '@components/Avatar'
import { BsFillPencilFill } from 'react-icons/bs'

interface Props {
  menu: Menu
}

const MenuDetail = ({ menu }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLikeClicked, setIsLikeClicked] = useState(true)

  const handleLikeClick = () => {
    setIsLikeClicked((prev) => !prev)
  }

  const handleEditMenuClick = () => {
    setIsModalOpen(true)
  }

  const handleEditMenuClose = () => {
    setIsModalOpen(false)
  }

  console.log(menu.tasteList)
  return (
    <MenuContainer>
      <Image src={menu.image} alt="" />

      <Hat />
      <Header>
        <LeftHeader>
          <FranchiseText>{menu.franchise.name} </FranchiseText>
          <Title>{menu.title}</Title>
        </LeftHeader>
        <RightHeader>
          {isLikeClicked ? (
            <Heart size={40} onClick={handleLikeClick} />
          ) : (
            <EmptyHeart size={40} onClick={handleLikeClick} />
          )}
          <LikesCountText clicked={isLikeClicked}>{menu.likes}</LikesCountText>
          <Dots size={30} onClick={handleEditMenuClick} />
          <Modal
            visible={isModalOpen}
            onClose={handleEditMenuClose}
            option="drawer"
          >
            <ModalItem>
              <BsFillPencilFill size={25} />
              수정
            </ModalItem>
            <ModalItem>
              <BiTrash size={25} />
              삭제
            </ModalItem>
          </Modal>
        </RightHeader>
      </Header>

      <Footer>
        <UserWrapper>
          <Avatar size={4} src={menu.author.image} isLoading={false} />
          <UserNameText>{menu.author.nickName}</UserNameText>
        </UserWrapper>
      </Footer>

      <OptionsWrapper>
        <OriginalTitle>{menu.originalTitle}</OriginalTitle>
        {menu.optionList.map(({ name, description }) => (
          <OptionText key={name}>
            {name} {description}
          </OptionText>
        ))}
        <PriceText>{menu.expectedPrice} 원</PriceText>
      </OptionsWrapper>

      <TagContainer>
        {menu.tasteList.map(({ id, name, color }) => (
          <Tag key={id} color={color}>
            <span>{name}</span>
          </Tag>
        ))}
      </TagContainer>
    </MenuContainer>
  )
}

const Flex = styled.div`
  display: flex;
`

const MenuContainer = styled.div`
  margin-bottom: 2rem;
`

const Hat = styled.div`
  position: relative;
  top: -1.5rem;
  background-color: white;
  width: 100%;
  height: 3rem;
  border-radius: 1.5rem;
`

const Header = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  position: relative;

  margin-top: 1rem;
  margin-bottom: 2rem;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
`

const LeftHeader = styled.div``

const FranchiseText = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  color: #a3a3a3;
  margin-bottom: 0.8rem;
`

const Title = styled.div`
  font-size: 2.8rem;
  font-weight: 700;
`

const RightHeader = styled(Flex)`
  align-items: center;
  position: relative;
  top: -1.6rem;
`

const EmptyHeart = styled(AiOutlineHeart)`
  cursor: pointer;
`

const Heart = styled(AiFillHeart)`
  color: red;
  cursor: pointer;
`

const LikesCountText = styled.span<{ clicked: boolean }>`
  color: ${({ clicked }) => (clicked ? 'white' : 'black')};
  position: relative;
  right: 2.5rem;
  font-size: 1.4rem;
  font-weight: 700;
`

const Dots = styled(BiDotsVerticalRounded)`
  cursor: pointer;
`

const ModalItem = styled(Flex)`
  font-size: 2rem;
  justify-content: center;
  width: 100vw;
  max-width: 50rem;
  cursor: pointer;

  &:not(:first-of-type) {
    margin-top: 1rem;
  }
`

const Footer = styled(Flex)`
  justify-content: space-between;
  margin-bottom: 2rem;
`

const OptionsWrapper = styled(Flex)`
  flex-direction: column;
  font-size: 2rem;
  margin-bottom: 1rem;
  padding: 1rem;

  & > div:first-of-type {
    margin-bottom: 2rem;
  }

  & > div:last-of-type {
    margin-bottom: 2rem;
  }
`

const OriginalTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
`

const OptionText = styled.span`
  font-size: 1.4rem;
`

const PriceText = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
  align-self: flex-end;
`

const UserWrapper = styled(Flex)`
  align-items: center;
`

const UserNameText = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-left: 1.2rem;
`

const TagContainer = styled(Flex)`
  gap: 1rem;
`

const Tag = styled(Flex)<{ color: string }>`
  display: flex;
  align-items: center;
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  background-color: ${({ color }) => color};
  min-width: fit-content;
  height: 3.2rem;
  padding: 1rem 2rem;
  border-radius: 1.6rem;
`

export default MenuDetail
