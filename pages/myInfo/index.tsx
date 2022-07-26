import styled from '@emotion/styled'
import { Button } from '@components/common'
import { PASSWORD_CHANGE_URL } from '@constants/pageUrl'
import { useRouter } from 'next/router'
import UserProfile from '@components/myInfo/UserProfile'
import UserData from '@components/myInfo/UserData'
import { useLogoutMutation } from '@hooks/mutations/useLogoutMutation'

const MyInfoPage = () => {
  const router = useRouter()
  const { mutate: postLogout } = useLogoutMutation()
  const handleLogout = () => {
    postLogout()
  }

  return (
    <>
      {router.isReady && (
        <UserContainer>
          <UserProfile />
          <UserData />
          <ChangePasswordButton
            onClick={() => router.push(PASSWORD_CHANGE_URL)}
          >
            비밀번호 변경
          </ChangePasswordButton>
          <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
        </UserContainer>
      )}
    </>
  )
}

const UserContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: white;
`

const ChangePasswordButton = styled(Button)`
  width: 100%;
  height: 5.6rem;
  margin-top: 4rem;
  background-color: ${(props) => props.theme.color.mainBlack};
  border-radius: 1rem;
  color: ${(props) => props.theme.color.mainWhite};
  font-size: 1.8rem;
  font-weight: 700;
  cursor: pointer;
`

const LogoutButton = styled(Button)`
  height: 5.6rem;
  margin-top: 1rem;
  background-color: ${(props) => props.theme.color.mainPink};
  border-radius: 1rem;
  color: ${(props) => props.theme.color.mainWhite};
  font-size: 1.8rem;
  font-weight: 700;
  cursor: pointer;
`

export default MyInfoPage
