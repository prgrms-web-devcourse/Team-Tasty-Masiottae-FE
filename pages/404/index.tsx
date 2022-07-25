import styled from '@emotion/styled'

const NotFound = () => {
  return <StyledNotFound>404 Not Found</StyledNotFound>
}

const StyledNotFound = styled.div`
  text-align: center;
  position: fixed;
  font-size: 4rem;
  font-weight: 700;
  top: 50%;
  left: 50%;
  margin: 0 auto 0 auto;
  transform: translateX(-50%);
`

export default NotFound
