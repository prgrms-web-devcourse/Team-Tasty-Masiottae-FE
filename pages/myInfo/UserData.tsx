import styled from '@emotion/styled'
const UserData = () => {
  return (
    <UserDataContainer>
      <UserDetailWrapper>
        <UserDetail>
          <Title>Email</Title>
          <Text>admin@co.kr</Text>
        </UserDetail>
        <UserDetail>
          <Title>닉네임</Title>
          <Text>계란이 좋아</Text>
        </UserDetail>
        <UserDetail>
          <Title>게시물 수</Title>
          <Text>200</Text>
        </UserDetail>
      </UserDetailWrapper>
    </UserDataContainer>
  )
}

const UserDataContainer = styled.div`
  margin-top: 7rem;
  position: relative;
`

const Title = styled.div`
  font-size: 2.6rem;
  margin: 0.2rem 0 0 2.8rem;
`

const Text = styled.div`
  font-size: 2.6rem;
  margin: 0.2rem 0 0 1rem;
  color: ${(props) => props.theme.color.fontNormal};
`

const UserDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 2rem 0 0 0;

  > div:first-of-type {
    border-top: 0.1rem solid ${(props) => props.theme.color.borderLight};
  }

  > div:nth-of-type(n + 2) {
    cursor: pointer;
  }
`

const UserDetail = styled.div`
  width: 100%;
  height: 8rem;
  border-bottom: 0.1rem solid ${(props) => props.theme.color.borderLight};
  display: flex;
  align-items: center;
`

export default UserData
