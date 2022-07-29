import Modal from '@components/Modal'
import styled from '@emotion/styled'
import React, {
  ChangeEvent,
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { BiDotsHorizontalRounded, BiTrash } from 'react-icons/bi'
import menuDummy from './menuDummy.json'
import commentListDummy from './commentsDummy.json'

const GUEST_INPUT_PLACEHOLDER = '로그인 후 작성해주세요(최대 80자).'
const LOGGEDIN_INPUT_PLACEHOLDER = '댓글을 입력해주세요.'

const Detail = () => {
  const [menu, setMenu] = useState(menuDummy)
  const [commentList, setCommentList] = useState(commentListDummy)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [comment, setComment] = useState('')

  const handleEditMenuClick = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    setIsModalOpen(true)
  }

  const handleEditMenuClose = () => {
    setIsModalOpen(false)
  }

  const handleDeleteCommentClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setIsDeleteModalOpen(true)
  }

  const handleDeleteCommentClose = () => {
    setIsDeleteModalOpen(false)
  }

  useEffect(() => {
    if (textareaRef === null || textareaRef.current === null) {
      return
    }
    textareaRef.current.style.height = '3rem'
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
  }, [])

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaRef === null || textareaRef.current === null) {
      return
    }

    textareaRef.current.style.height = '3rem'
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'

    setComment(e.target.value)
  }, [])

  const handleAddButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log(comment)
  }

  return (
    <>
      <PostContainer>
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

        <PostInfoBox>
          <UserWrapper>
            <Avatar src={menu.author.profileImageUrl} />
            <UserNameText>{menu.author.name}</UserNameText>
          </UserWrapper>
          <LikeWrapper>
            <Heart size={30} />
            <span>{menu.likes}</span>
          </LikeWrapper>
        </PostInfoBox>

        <OptionsWrapper>
          <FranchiseText>스타벅스</FranchiseText>
          <div>기본: 프라푸치노</div>
          <div>+ 에스프레소 1샷</div>
          <div>+ 통 자바칩</div>
          <div>+ 카라멜 드리즐</div>
        </OptionsWrapper>

        <PostInfoBox>
          <TagContainer>
            <SweetTag>매우 단</SweetTag>
            <HotTag>맵</HotTag>
            <SaltyTag>짠</SaltyTag>
            <BitterTag>쓴</BitterTag>
          </TagContainer>
          <span>예상 가격 {menu.expectedPrice} 원</span>
        </PostInfoBox>
      </PostContainer>

      <CommentWriteContainer>
        <Textarea
          ref={textareaRef}
          placeholder={
            isLoggedIn ? LOGGEDIN_INPUT_PLACEHOLDER : GUEST_INPUT_PLACEHOLDER
          }
          maxLength={80}
          onChange={handleChange}
        />
        <AddCommentButton onClick={handleAddButtonClick}>등록</AddCommentButton>
      </CommentWriteContainer>

      <CommentListContainer>
        <CommnetCountText>댓글 {commentList.length} 개</CommnetCountText>
        {commentList.map((comment) => (
          <Fragment key={comment.id}>
            <UserWrapper>
              <Avatar src={comment.author.profileImageUrl} />
              <Comment>
                <span>{comment.comment}</span>
                <ButtonWrapper onClick={handleDeleteCommentClick}>
                  <DeleteButton size={20} />
                  <Modal
                    visible={isDeleteModalOpen}
                    onClose={handleDeleteCommentClose}
                    option="drawer"
                  >
                    <ModalItem>삭제</ModalItem>
                  </Modal>
                </ButtonWrapper>
              </Comment>
            </UserWrapper>
          </Fragment>
        ))}
      </CommentListContainer>
    </>
  )
}

const Flex = styled.div`
  display: flex;
`

// 글 정보
const PostContainer = styled.div`
  margin-bottom: 2rem;
`

const PostInfoBox = styled(Flex)`
  justify-content: space-between;
  margin-bottom: 2rem;
`

const Header = styled(Flex)`
  justify-content: space-between;
  align-items: center;
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
  margin-bottom: -50%;
`

const OptionsWrapper = styled.div`
  background-color: #d9d9d9;
  margin-bottom: 1rem;

  & > div:first-of-type {
    margin-bottom: 1rem;
  }
`

const FranchiseText = styled.span`
  font-weight: 700;
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

const UserNameText = styled.div``

const LikeWrapper = styled(Flex)`
  align-items: center;
`

const Heart = styled(AiFillHeart)`
  color: red;
  cursor: pointer;
`

const EmptyHeart = styled(AiOutlineHeart)``

const Tag = styled.span`
  font-weight: 700;
  padding: 0 0.5rem;
  margin-left: 0.5rem;
`

const TagContainer = styled.div``

const SweetTag = styled(Tag)`
  background-color: #ffce31;
`
const HotTag = styled(Tag)`
  color: white;
  background-color: #ff0000;
`
const SaltyTag = styled(Tag)`
  color: white;
  background-color: #1cc55f;
`
const BitterTag = styled(Tag)`
  background-color: #c4c4c4;
`

// 댓글 입력
const CommentWriteContainer = styled(Flex)`
  position: relative;
  align-items: center;
  margin-bottom: 2rem;
`

const Textarea = styled.textarea`
  width: 100%;
  min-height: 4rem;
  font-size: 1.6rem;
  border: 0.1rem solid rgba(0, 0, 0, 0.4);
  border-radius: 1rem;
  padding: 1rem 7rem 1rem 1rem;
  resize: none;
  overflow: hidden;

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-size: 1.4rem;
  }
`

const AddCommentButton = styled.button`
  position: absolute;
  bottom: 0.5rem;
  right: 1rem;
  width: 5rem;
  height: 3rem;
  border: none;
  border-radius: 0.6rem;
  color: #f5f5f5;
  background-color: black;
  margin-left: -6rem;
  cursor: pointer;
`

// 댓글 리스트
const CommentListContainer = styled.div``

const CommnetCountText = styled.div`
  margin-bottom: 2rem;
`

const Comment = styled(Flex)`
  font-size: 1.4rem;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.03);
`

const ButtonWrapper = styled.div`
  justify-self: flex-end;
  margin-left: 0.5rem;
  cursor: pointer;
`

const DeleteButton = styled(BiTrash)``

export default Detail
