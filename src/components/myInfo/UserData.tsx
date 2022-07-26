import styled from '@emotion/styled'
import { useRecoilState } from 'recoil'
import { currentUser } from '@recoil/currentUser'
import { User } from '@interfaces'

const UserData = () => {
  const [user] = useRecoilState<User>(currentUser)
  return (
    <UserDataContainer>
      <UserDetailWrapper>
        <UserDetail>
          <Title>Email</Title>
          <Text>{user.email}</Text>
        </UserDetail>
        <UserDetail>
          <Title>가입일</Title>
          <Text>{user.createdAt.substring(0, 10)}</Text>
        </UserDetail>
        <UserDetail>
          <Title>게시물 수</Title>
          <Text>{user.menuCount}</Text>
        </UserDetail>
      </UserDetailWrapper>
    </UserDataContainer>
  )
}

const UserDataContainer = styled.div`
  position: relative;
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
`

const UserDetail = styled.div`
  width: 100%;
  height: 5.6rem;
  border-bottom: 0.1rem solid ${(props) => props.theme.color.borderLight};
  display: flex;
  align-items: center;
`

const Title = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0.2rem 0 0 2.8rem;
`

const Text = styled.div`
  font-size: 1.8rem;
  margin: 0.2rem 0 0 1rem;
`

export default UserData
