import styled from '@emotion/styled'
import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { BiDotsHorizontalRounded } from 'react-icons/bi'

const COMMENT_INPUT_PLACEHOLDER = '로그인한 회원만 댓글을 달 수 있습니다.'

const Detail = () => {
  return (
    <>
      <PostContainer>
        <TitleWrapper>
          <Title>슈렉 프라푸치노</Title>
          <Dots size={30} onClick={(e) => console.log(e)} />
        </TitleWrapper>

        <ImageWrapper>
          <AAAAAAAImageBox />
        </ImageWrapper>

        <PostSummaryWrapper>
          <Flex>
            <AAAAAAAAAAvatar />
            <span>유저 이름</span>
          </Flex>
          <Flex>
            <Heart onClick={(e) => console.log(e)} />
            <span>200</span>
          </Flex>
        </PostSummaryWrapper>

        <OptionsWrapper>
          <div>기본: 프라푸치노</div>
          <div>+ 에스프레소 1샷</div>
          <div>+ 통 자바칩</div>
          <div>+ 카라멜 드리즐</div>
        </OptionsWrapper>

        <PostSummaryWrapper>
          <TagContainer>
            <SweetTag>매우 단</SweetTag>
            <HotTag>맵</HotTag>
            <SaltyTag>짠</SaltyTag>
            <BitterTag>쓴</BitterTag>
          </TagContainer>
          <span>예상 가격: 9000 원</span>
        </PostSummaryWrapper>
      </PostContainer>

      <CommentWriteContainer>
        <Input type="text" placeholder={COMMENT_INPUT_PLACEHOLDER} />
        <AddCommentButton onClick={(e) => console.log(e)}>
          등록
        </AddCommentButton>
      </CommentWriteContainer>

      <CommentListContainer>
        <div>댓글 10 개</div>

        <Flex>
          <AAAAAAAAAAvatar />
          <Comment>너무 달아서 별로임</Comment>
        </Flex>
        <Flex>
          <AAAAAAAAAAvatar />
          <Comment>너무 달아서 별로임</Comment>
        </Flex>
        <Flex>
          <AAAAAAAAAAvatar />
          <Comment>너무 달아서 별로임</Comment>
        </Flex>
        <Flex>
          <AAAAAAAAAAvatar />
          <Comment>너무 달아서 별로임</Comment>
        </Flex>
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

const PostSummaryWrapper = styled(Flex)`
  justify-content: space-between;
`

const TitleWrapper = styled(Flex)`
  justify-content: space-between;
  align-items: center;
`

const Title = styled.span`
  font-size: 3.6rem;
`

const Dots = styled(BiDotsHorizontalRounded)`
  cursor: pointer;
`

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  max-width: 50rem;
  height: 100vw;
  max-height: 50rem;
`

const OptionsWrapper = styled.div`
  background-color: #d9d9d9;
  margin-bottom: 1rem;

  & > div:first-child {
    margin-bottom: 1rem;
  }
`

const AAAAAAAImageBox = styled.div`
  width: 50%;
  height: 50%;
  background-color: skyblue;
`

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

const Heart = styled(AiFillHeart)`
  color: red;
  cursor: pointer;
`

const EmptyHeart = styled(AiOutlineHeart)``

// 댓글 입력
const CommentWriteContainer = styled(Flex)`
  align-items: center;
  margin-bottom: 2rem;
`

const Input = styled.input`
  width: 100%;
  height: 4rem;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 1rem;
  padding-right: 7rem;

  &:focus {
    outline: none;
  }
`

const AddCommentButton = styled.button`
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

const AAAAAAAAAAvatar = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: gray;
`

const Comment = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.03);
`

export default Detail
