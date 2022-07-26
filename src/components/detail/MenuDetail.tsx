import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { Menu } from '@interfaces'
import { Modal, Avatar } from '@components/common'
import { useDeleteMenuMutation } from '@hooks/mutations/useDeleteMenuMutation'
import { useRouter } from 'next/router'
import { usePostLikeMutation } from '@hooks/mutations/usePostLikeMutation'
import { NO_IMAGE } from '@constants/image'
import { IoMdHeart } from 'react-icons/io'
import { BsFillPencilFill } from 'react-icons/bs'
import { BiDotsVerticalRounded, BiTrash } from 'react-icons/bi'

interface Props {
  menu: Menu
  userId: number | null
}

const MenuDetail = ({ menu, userId }: Props) => {
  const [isLikeClicked, setIsLikeClicked] = useState(menu.isLiked)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLogInModalOpen, setIsLogInModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const { mutate: deleteMenu } = useDeleteMenuMutation()
  const { mutate: postLike, isLoading } = usePostLikeMutation({
    menuId: menu.id
  })
  const router = useRouter()

  useEffect(() => {
    setIsLoggedIn(!!userId)
    setIsOwner(menu.author.id === userId)
  }, [menu.author.id, userId])

  const handleUserClick = (userId: number | null) => {
    if (!userId) {
      return
    }
    router.push(`/user/${userId}`)
  }

  const handleHeartClick = () => {
    if (isLoading) {
      return
    }

    if (!isLoggedIn) {
      setIsLogInModalOpen(true)
      return
    }

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

  const handleMenuEditClick = () => {
    router.push(`/edit-menu/${menu.id}`)
  }

  const handleMenuDeleteClick = () => {
    deleteMenu(
      { menuId: menu.id },
      {
        onSuccess: () => {
          setIsModalOpen(false)
          router.back()
        }
      }
    )
  }

  const handleModalClose = () => {
    setIsLogInModalOpen(false)
  }

  return (
    <>
      <MenuContainer>
        <ImageWrapper>
          <Img src={menu.image ? menu.image : NO_IMAGE} />
        </ImageWrapper>

        <HatWrapper>
          <Hat />
        </HatWrapper>
        <Header>
          <LeftHeader>
            <FranchiseText>{menu.franchise.name} </FranchiseText>
            <Title>{menu.title}</Title>
          </LeftHeader>
          <RightHeader guest={!isOwner}>
            {isLikeClicked ? (
              <Heart size={50} onClick={handleHeartClick}></Heart>
            ) : (
              <EmptyHeart size={50} onClick={handleHeartClick} />
            )}
            <LikesCountText clicked={isLikeClicked} onClick={handleHeartClick}>
              <span>{menu.likes}</span>
            </LikesCountText>
            {isOwner && <Dots size={30} onClick={handleEditMenuClick} />}
          </RightHeader>
        </Header>

        <UserWrapper onClick={() => handleUserClick(menu.author.id)}>
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
        <ModalItem onClick={handleMenuEditClick}>
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
      <Modal visible={isLogInModalOpen} onClose={handleModalClose}>
        <ModalSpanItem>
          <span>로그인해주세요.</span>
        </ModalSpanItem>
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
  max-width: 30rem;
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
  cursor: pointer;
`

const Dots = styled(BiDotsVerticalRounded)`
  cursor: pointer;
`

const ModalItem = styled(Flex)`
  align-items: center;
  height: 5rem;
  font-size: 2rem;
  justify-content: center;
  width: 100vw;
  max-width: 50rem;
  cursor: pointer;

  &:not(:first-of-type) {
    margin-top: 1rem;
  }
`

const ModalSpanItem = styled(Flex)`
  justify-content: center;
  align-items: center;
  height: 5rem;

  & > span {
    font-weight: 700;
    font-size: 1.8rem;
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

const UserWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  margin-bottom: 1rem;
`

const UserNameText = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-left: 1.2rem;
  cursor: pointer;
`

const TagContainer = styled(Flex)`
  gap: 1rem;
  flex-wrap: wrap;
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
