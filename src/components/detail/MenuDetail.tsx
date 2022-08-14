import React, { useState } from 'react'
import styled from '@emotion/styled'
import Modal from '@components/Modal'
import { BiDotsVerticalRounded, BiTrash } from 'react-icons/bi'
import { Menu } from '@interfaces'
import { useDeleteMenuMutation } from '@hooks/mutations/useDeleteMenuMutation'
import { useRouter } from 'next/router'
import Avatar from '@components/Avatar'
import { BsFillPencilFill } from 'react-icons/bs'
import { IoMdHeart } from 'react-icons/io'
import { usePostLikeMutation } from '@hooks/mutations/usePostLikeMutation'

interface Props {
  menu: Menu
  userId: number | null
}

const MenuDetail = ({ menu, userId }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { mutate: deleteMenu } = useDeleteMenuMutation()
  const router = useRouter()
  const [isLikeClicked, setIsLikeClicked] = useState(false)
  const { mutate: postLike } = usePostLikeMutation({ menuId: menu.id })

  const handleHeartClick = () => {
    postLike(
      {
        menuId: menu.id
      },
      {
        onSuccess: () => {
          setIsLikeClicked((prev) => !prev)
        }
      }
    )
  }

  const handleEditMenuClick = () => {
    setIsModalOpen(true)
  }

  const handleEditMenuClose = () => {
    setIsModalOpen(false)
  }

  const handleMenuDeleteClick = () => {
    deleteMenu(
      { menuId: menu.id },
      {
        onSuccess: () => {
          setIsModalOpen(false)
          router.replace('/')
        }
      }
    )
  }

  return (
    <>
      <MenuContainer>
        <ImageWrapper>
          <Img src={menu.image} />
        </ImageWrapper>

        <HatWrapper>
          <Hat />
        </HatWrapper>
        <Header>
          <LeftHeader>
            <FranchiseText>{menu.franchise.name} </FranchiseText>
            <Title>{menu.title}</Title>
          </LeftHeader>
          <RightHeader guest={menu.author.id !== userId}>
            {isLikeClicked ? (
              <Heart size={50} onClick={handleHeartClick}></Heart>
            ) : (
              <EmptyHeart size={50} onClick={handleHeartClick} />
            )}
            <LikesCountText clicked={isLikeClicked}>
              <span>{menu.likes}</span>
            </LikesCountText>
            {menu.author.id === userId && (
              <Dots size={30} onClick={handleEditMenuClick} />
            )}
          </RightHeader>
        </Header>

        <UserWrapper>
          <Avatar size={4} src={menu.author.image} isLoading={false} />
          <UserNameText>{menu.author.nickName}</UserNameText>
        </UserWrapper>

        <OptionsWrapper>
          <OriginalTitle>{menu.originalTitle}</OriginalTitle>
          {menu.optionList.map(({ name, description }) => (
            <OptionText key={name}>
              {name} {description}
            </OptionText>
          ))}
          <PriceText>
            {menu.expectedPrice === 0 ? '미정' : `${menu.expectedPrice} 원`}
          </PriceText>
        </OptionsWrapper>

        <TagContainer>
          {menu.tasteList.map(({ id, name, color }) => (
            <Tag key={id} color={color}>
              <span>{name}</span>
            </Tag>
          ))}
        </TagContainer>
      </MenuContainer>
      <Modal
        visible={isModalOpen}
        onClose={handleEditMenuClose}
        option="drawer"
      >
        <ModalItem>
          <IconWrapper>
            <BsFillPencilFill size={20} />
          </IconWrapper>
          수정
        </ModalItem>
        <ModalItem onClick={handleMenuDeleteClick}>
          <BiTrash size={25} />
          삭제
        </ModalItem>
      </Modal>
    </>
  )
}

const Flex = styled.div`
  display: flex;
`

const MenuContainer = styled.div`
  margin-bottom: 2rem;
`

const ImageWrapper = styled.div`
  margin: 0 -2rem;
`

const Img = styled.div<{ src: string }>`
  display: flex;
  width: 100%;
  height: 100%;
  padding-top: 50%;
  padding-bottom: 50%;
  background-image: ${({ src }) => (src ? `url(${src})` : null)};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`

const HatWrapper = styled.div`
  margin: 0 -2rem;
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
  margin-top: -1.5rem;
  margin-bottom: 2rem;
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

const RightHeader = styled(Flex)<{ guest: boolean }>`
  width: 8rem;
  align-items: center;
  position: relative;
  top: -2rem;
  left: ${({ guest }) => (guest ? '2rem' : '0')};
`

const EmptyHeart = styled(IoMdHeart)`
  margin-right: -1rem;
  color: gray;
  cursor: pointer;
`

const Heart = styled(IoMdHeart)`
  margin-right: -1rem;
  color: red;
  cursor: pointer;
`

const LikesCountText = styled(Flex)<{ clicked: boolean }>`
  justify-content: center;
  width: 0.6rem;
  color: white;
  position: relative;
  right: 1.8rem;
  bottom: 0.2rem;
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

const IconWrapper = styled(Flex)`
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
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
  font-size: 1.8rem;
  font-weight: 700;
`

const OptionText = styled.span`
  font-size: 1.6rem;
`

const PriceText = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
  align-self: flex-end;
`

const UserWrapper = styled(Flex)`
  align-items: center;
  margin-bottom: 1rem;
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
  padding: 1.8rem 2.4rem;
  border-radius: 1.8rem;
`

export default MenuDetail
