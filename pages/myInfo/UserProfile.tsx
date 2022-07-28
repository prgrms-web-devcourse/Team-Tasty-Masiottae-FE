import React, { useState, useCallback } from 'react'
import styled from '@emotion/styled'
import ChangeProfileModal from './ChangeProfileModal'
import Input from '@components/Input'
import Button from '@components/Button'
import { BsFillPencilFill } from 'react-icons/bs'
import useClickAway from '@hooks/useClickAway'

const CHANGE_NICKNAME_PLACEHOLDER = '변경할 닉네임'

const UserProfile = () => {
  const [isNameEditor, setIsNameEditor] = useState(false)
  const [isProfileModal, setIsProfileModal] = useState(false)
  const [imgSrc, setImgSrc] = useState('')
  const nameEditRef = useClickAway(() => setIsNameEditor(false))

  const onFileChange = useCallback((src: string) => {
    setImgSrc(src)
  }, [])

  const onProfileSubmit = useCallback(() => {
    if (imgSrc) {
      //TODO신영 : 프로필 변경 API 핸들러 호출
    }
  }, [imgSrc])

  const onCloseProfile = () => {
    setIsProfileModal(false)
  }

  const onNickNameChange = useCallback((value: string) => {
    //TODO신영: 이름변경 API 핸들러 호출
    setIsNameEditor(false)
  }, [])

  return (
    <UserProfileWrapper>
      {' '}
      <UserImage onClick={() => setIsProfileModal(true)} />
      {isNameEditor ? (
        <NickName ref={nameEditRef}>
          <ChangeNickNameInput
            type="text"
            placeholder={CHANGE_NICKNAME_PLACEHOLDER}
          />
          <ChangeNickNameButton>수정</ChangeNickNameButton>
        </NickName>
      ) : (
        <NickName>
          <Text>계란이 좋아</Text>
          <EditNameIcon onClick={() => setIsNameEditor(true)} />
        </NickName>
      )}{' '}
      {isProfileModal && (
        <ChangeProfileModal
          onFileChange={onFileChange}
          onProfileSubmit={onProfileSubmit}
          onClose={onCloseProfile}
          currentProfile={'사용자 이미지url (미리보기)'}
        />
      )}
    </UserProfileWrapper>
  )
}

export default UserProfile

const UserProfileWrapper = styled.div`
  text-align: center;
  margin: 5rem auto 3rem auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const UserImage = styled.div`
  width: 14rem;
  height: 14rem;
  border-radius: 50%;
  position: relative;
  background-color: grey;
  cursor: pointer;
`

const NickName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30rem;
  margin: 1.5rem 0 0 0;
  position: relative;
  cursor: pointer;
`

const ChangeNickNameInput = styled(Input)`
  width: 90%;
  height: 5rem;
  font-size: 2rem;
`

const ChangeNickNameButton = styled(Button)`
  height: 3.5rem;
  width: 6rem;
  cursor: pointer;
  position: absolute;
  right: 2.2rem;
  background-color: ${(props) => props.theme.color.mainBlack};
  color: white;
`

const Text = styled.div`
  font-size: 2rem;
  margin: 0.2rem 0 0 1rem;
  font-weight: 700;
`
const EditNameIcon = styled(BsFillPencilFill)`
  width: 2rem;
  height: 2rem;
`
