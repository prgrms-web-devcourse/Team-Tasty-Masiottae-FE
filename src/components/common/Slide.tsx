import { useState } from 'react'
import { Menu } from '@interfaces'
import { IoMdHeart } from 'react-icons/io'
import { BiComment } from 'react-icons/bi'
import { GrNext, GrPrevious } from 'react-icons/gr'
import { GoPrimitiveDot } from 'react-icons/go'
import Image from 'next/image'
import styled from '@emotion/styled'
import Link from 'next/link'

interface Props {
  menuList: Menu[]
}

const Slide = ({ menuList }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(1)
  const [behindSlide, setBehindSlide] = useState(0)
  const [prevX, setPrevX] = useState(0)
  const [slideX, setSlideX] = useState(0)

  const getSlideX = (event: React.TouchEvent<HTMLDivElement>) => {
    return event.type == 'touchstart'
      ? event.touches[0].clientX
      : event.type == 'touchmove' || event.type == 'touchend'
      ? event.changedTouches[0].clientX
      : 0
  }

  const setNextSlideBehind = () => {
    if (currentSlide >= 5) {
      setBehindSlide(1)
    } else {
      setBehindSlide(currentSlide + 1)
    }
  }

  const setPrevSlideBehind = () => {
    if (currentSlide <= 1) {
      setBehindSlide(5)
    } else {
      setBehindSlide(currentSlide - 1)
    }
  }

  const handleSlidePrev = () => {
    if (currentSlide <= 1) {
      setCurrentSlide(5)
    } else {
      setCurrentSlide((currentSlide) => currentSlide - 1)
    }
  }

  const handleSlideNext = () => {
    if (currentSlide >= 5) {
      setCurrentSlide(1)
    } else {
      setCurrentSlide((currentSlide) => currentSlide + 1)
    }
  }

  const handleSelectSlide = (id: number) => {
    setCurrentSlide(id)
  }

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setPrevX(getSlideX(event))
  }

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const clientX = getSlideX(event)
    const isNextMove = clientX >= prevX
    if (isNextMove) {
      setSlideX(clientX)
      setNextSlideBehind()
    } else {
      setSlideX(-1 * prevX)
      setPrevSlideBehind()
    }
  }

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const clientX = getSlideX(event)
    if (clientX >= prevX) {
      handleSlideNext()
    } else {
      handleSlidePrev()
    }
    setSlideX(0)
  }

  return (
    <SlideContainer>
      <>
        {menuList.map((menu) => (
          <SlideItem
            key={menu.image}
            selected={currentSlide === menu.id}
            slideX={slideX}
            isBehind={behindSlide === menu.id}
          >
            <ImageWrapper
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <Link href={`/detail/${menu.id}`}>
                <a>
                  <Image src={menu.image} alt="bannerImage" layout="fill" />
                </a>
              </Link>
              <SlidePrev onClick={handleSlidePrev} />
              <SlideNext onClick={handleSlideNext} />
            </ImageWrapper>
            <Info>
              <Upper>
                <Franchise>{menu.franchise.name}</Franchise>
                <Flex>
                  <Likes>
                    <IoMdHeart />
                    {menu.likes}
                  </Likes>
                  <Comments>
                    <BiComment />
                    {menu.comments}
                  </Comments>
                </Flex>
              </Upper>
              <MenuTitle>{menu.title}</MenuTitle>
            </Info>
          </SlideItem>
        ))}
      </>
      <DotWrapper>
        {menuList.map((menu) => (
          <SlideDot
            key={menu.id}
            selected={currentSlide === menu.id}
            onClick={() => handleSelectSlide(menu.id)}
          />
        ))}
      </DotWrapper>
    </SlideContainer>
  )
}

const Flex = styled.div`
  display: flex;
`

const SlideContainer = styled(Flex)`
  width: 100%;
  position: relative;
  flex-direction: column;
  height: 62vh;
  border-bottom: 1px solid ${({ theme }) => theme.color.borderLight};
`

const SlideItem = styled.div<{
  selected: boolean
  slideX: number
  isBehind: boolean
}>`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  overflow: hidden;
  border-radius: 1rem;
  position: absolute;
  transform: translateX(${({ selected, slideX }) => selected && `${slideX}px`});
  z-index: ${({ selected, isBehind }) => (selected ? 2 : isBehind ? 1 : 0)};
`

const ImageWrapper = styled.div`
  position: relative;
  cursor: pointer;

  &::after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`

const SlideNext = styled(GrNext)`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 5.6rem;
  height: 10rem;
  opacity: 0;
  &:hover {
    display: block;
    background-color: ${({ theme }) => theme.color.borderLight};
    opacity: 0.5;
  }
`

const SlidePrev = styled(GrPrevious)`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 5.6rem;
  height: 10rem;
  opacity: 0;
  &:hover {
    display: block;
    background-color: ${({ theme }) => theme.color.borderLight};
    opacity: 0.5;
  }
`

const Info = styled(Flex)`
  background-color: white;
  z-index: 2;
  height: 7rem;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1.6rem;
  position: relative;
  top: -2rem;
`

const Upper = styled(Flex)`
  margin: 1.6rem 0.4rem 0 0;
  justify-content: space-between;
  font-size: 1.4rem;
`

const Franchise = styled.div`
  color: ${({ theme }) => theme.color.franchiseLight};
  font-weight: 700;
`
const Likes = styled(Flex)`
  gap: 0.2rem;
  justify-content: space-evenly;
  align-items: center;

  & > svg {
    color: red;
  }
`
const Comments = styled(Flex)`
  margin-left: 1rem;
  gap: 0.2rem;
  justify-content: space-evenly;
  align-items: center;
`

const MenuTitle = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
`

const DotWrapper = styled(Flex)`
  width: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 1.2rem;
`

const SlideDot = styled(GoPrimitiveDot)<{ selected: boolean }>`
  font-size: 2rem;
  opacity: ${({ selected }) => (selected ? 1 : 0.2)};
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`

export default Slide
