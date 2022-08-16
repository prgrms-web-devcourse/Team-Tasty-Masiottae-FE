import { SPINNER_LOGO } from '@constants/image'
import theme from '@constants/theme'
import styled from '@emotion/styled'
import Image from 'next/image'
import { IoCloseSharp } from 'react-icons/io5'

interface Props {
  content: string
  src: string
  isClosed: boolean
}

const BannerCard = ({ content, src }: Props) => {
  return (
    <Container>
      <BannerLeft>
        <Image src={SPINNER_LOGO} width={60} height={16} alt="로고" />
        <Content>{content}</Content>
      </BannerLeft>
      <Image src={src} width={150} height={150} alt="메인배너" />
      <CloseButton />
    </Container>
  )
}

const CloseButton = styled(IoCloseSharp)`
  position: absolute;
  font-size: 1.6rem;
  font-weight: 700;
  top: 1rem;
  right: 1rem;
  color: ${theme.color.fontLight};
  cursor: pointer;
`

const BannerLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 100%;
`

const Content = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  width: 16rem;
  line-height: 2.8rem;
`

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 1rem;
  padding: 2rem;

  height: 18rem;

  background: #ffffff;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
`

export default BannerCard
