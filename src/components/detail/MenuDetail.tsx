import React, { useState } from 'react'
import styled from '@emotion/styled'
import Modal from '@components/Modal'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { Menu } from '@interfaces'

interface Props {
  menu: Menu
}

const MenuDetail = ({ menu }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleEditMenuClick = () => {
    setIsModalOpen(true)
  }

  const handleEditMenuClose = () => {
    setIsModalOpen(false)
  }

  return (
    <MenuContainer>
      <Header>
        <Title>{menu.title}</Title>
        <Dots size={30} onClick={handleEditMenuClick} />
        <Modal
          visible={isModalOpen}
          onClose={handleEditMenuClose}
          option="drawer"
        >
          <ModalItem>수정</ModalItem>
          <ModalItem>삭제</ModalItem>
        </Modal>
      </Header>

      <ImageWrapper>
        <Image src={menu.image} alt="" />
      </ImageWrapper>

      <Footer>
        <UserWrapper>
          <Avatar src={menu.author.image} />
          <UserNameText>{menu.author.nickName}</UserNameText>
        </UserWrapper>
        <LikeWrapper>
          <EmptyHeart size={30} />
          <LikesCountText>{menu.likes}</LikesCountText>
        </LikeWrapper>
      </Footer>

      <OptionsWrapper>
        <div>
          <FranchiseText>{menu.franchise.name} </FranchiseText>
          <span>{menu.originalTitle}</span>
        </div>
        {menu.optionList.map(({ name, description }) => (
          <OptionText key={name}>
            + {name} {description}
          </OptionText>
        ))}
        <PriceText>예상 가격: {menu.expectedPrice} 원</PriceText>
      </OptionsWrapper>
    </MenuContainer>
  )
}

const Flex = styled.div`
  display: flex;
`

const MenuContainer = styled.div`
  margin-bottom: 2rem;
`

const Header = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 2rem;
`

const Title = styled.span`
  font-size: 3.6rem;
`

const Dots = styled(BiDotsHorizontalRounded)`
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

const ImageWrapper = styled(Flex)`
  justify-content: center;
  max-width: 50rem;
  height: 100vw;
  max-height: 50rem;
  margin-bottom: -45%;
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
  border: 0.1rem solid rgba(0, 0, 0, 0.4);
  border-radius: 1rem;

  & > div:first-of-type {
    margin-bottom: 2rem;
  }

  & > div:last-of-type {
    margin-bottom: 2rem;
  }
`

const FranchiseText = styled.span`
  font-weight: 700;
`

const OptionText = styled.span`
  font-size: 1.4rem;
`

const PriceText = styled.span`
  font-size: 1.6rem;
  align-self: flex-end;
`

const Image = styled.img`
  width: 50%;
  height: 50%;
`

const Avatar = styled.img`
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
`

const UserWrapper = styled(Flex)`
  align-items: center;
`

const UserNameText = styled.div`
  font-size: 2rem;
  font-weight: 700;
`

const LikeWrapper = styled(Flex)`
  align-items: center;
`

const Heart = styled(AiFillHeart)`
  color: red;
  cursor: pointer;
`

const EmptyHeart = styled(AiOutlineHeart)`
  cursor: pointer;
`

const LikesCountText = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
`

export default MenuDetail
