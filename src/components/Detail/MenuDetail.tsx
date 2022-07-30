import Modal from '@components/Modal'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import menuDummy from './menuDummy.json'

const MenuDetail = () => {
  const [menu, setMenu] = useState(menuDummy)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleEditMenuClick = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
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
        <Image src={menu.imageUrl} alt="" />
      </ImageWrapper>

      <Footer>
        <UserWrapper>
          <Avatar src={menu.author.profileImageUrl} />
          <UserNameText>{menu.author.name}</UserNameText>
        </UserWrapper>
        <LikeWrapper>
          <Heart size={30} />
          <LikesCountText>{menu.likes}</LikesCountText>
        </LikeWrapper>
      </Footer>

      <OptionsWrapper>
        <div>
          <FranchiseText>[{menu.franchise}] </FranchiseText>
          <span>{menu.originalTitle}</span>
        </div>
        {menu.options.map((option) => (
          <>
            <OptionText>
              + {option.name} {option.description}
            </OptionText>
          </>
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

const LikesCountText = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
`

const EmptyHeart = styled(AiOutlineHeart)``

export default MenuDetail
