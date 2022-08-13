import styled from '@emotion/styled'

const LOGO_LETTER_URL = [
  'https://user-images.githubusercontent.com/75849590/184398210-4d79fd33-3ebd-42e5-8ec8-c1d6576ebd05.png',
  'https://user-images.githubusercontent.com/75849590/184398219-d137e516-9329-45a1-8c24-310ed8f59622.png',
  'https://user-images.githubusercontent.com/75849590/184398219-d137e516-9329-45a1-8c24-310ed8f59622.png',
  'https://user-images.githubusercontent.com/75849590/184355044-60c66a32-6fce-4569-9d8a-e7f2bed1f98a.png'
]

const Spinner = () => {
  return (
    <Container>
      <Background />
      {LOGO_LETTER_URL.map((url, idx) => (
        <LogoLetter key={idx} url={url} idx={idx} />
      ))}
    </Container>
  )
}
export default Spinner
const Container = styled.div`
  position: fixed;
  width: 50rem;
  height: ${(props) =>
    `calc(100vh - ${props.theme.layout.headerHeight} - ${props.theme.layout.navHeight} )`};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  @media all and (max-width: 500px) {
    width: 100%;
  }
`
const LogoLetter = styled.div<{ url: string; idx: number }>`
  width: 3.2rem;
  height: 3.2rem;
  background-image: ${({ url }) => `url(${url})`};
  background-repeat: no-repeat;
  background-size: cover;
  animation: ball 1s ease-in infinite alternate;
  animation-delay: ${({ idx }) => `${idx * 0.5}s`};
  @keyframes ball {
    0% {
      margin-bottom: 1rem;
    }
    100% {
      margin-bottom: 5rem;
    }
  }
  z-index: 1;
`

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: #000;
  opacity: 25%;
`
