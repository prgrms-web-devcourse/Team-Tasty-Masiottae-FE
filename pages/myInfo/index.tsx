import styled from '@emotion/styled'
import UserData from './UserData'
import UserProfile from './UserProfile'
import Button from '@components/Button'
import { LOGIN_URL, PASSWORD_CHANGE_URL } from '@constants/pageUrl'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useClickAway from '@hooks/useClickAway'

const MyInfoPage = () => {
  const router = useRouter()
  const [isLogoutModal, setIsLogoutModal] = useState(false)

  const onCloseLogout = () => {
    setIsLogoutModal(false)
  }

  const logoutModalRef = useClickAway(onCloseLogout)

  return (
    <UserContainer>
      <UserProfile />
      <UserData />
      <ChangePasswordButton onClick={() => router.push(PASSWORD_CHANGE_URL)}>
        비밀번호 변경하기
      </ChangePasswordButton>{' '}
      <LogoutButton onClick={() => router.push(LOGIN_URL)}>
        로그아웃
      </LogoutButton>
    </UserContainer>
  )
}

export default MyInfoPage

const UserContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: white;
`

const ChangePasswordButton = styled(Button)`
  width: 100%;
  height: 7rem;
  margin-top: 4rem;
  background-color: ${(props) => props.theme.color.mainBlack};
  border-radius: 1rem;
  color: white;
  font-size: 1.7rem;
  font-weight: 500;
  cursor: pointer;
`

const LogoutButton = styled(Button)`
  height: 7rem;
  margin-top: 1rem;
  background-color: ${(props) => props.theme.color.mainPink};
  border-radius: 1rem;
  color: white;
  font-size: 1.7rem;
  font-weight: 500;
  cursor: pointer;
`
