import React, { useState, useCallback } from 'react'
import styled from '@emotion/styled'
import Input from '@components/Input'
import Button from '@components/Button'
import { BsFillPencilFill } from 'react-icons/bs'
import useClickAway from '@hooks/useClickAway'
import { useRecoilState } from 'recoil'
import { currentUser } from '@recoil/currentUser'
import { User } from '@interfaces'
import Image from 'next/image'
import Modal from '@components/Modal'
import axios from '@lib/axios'
import ImageUploader from '@components/ImageUploader'
import {
  MESSAGE_NICKNAME,
  REGEX_NICKNAME,
  PLACEHOLDER_NICKNAME,
  INPUT_NICKNAME
} from '@constants/inputConstants'
import { useChangeImageMutation } from '@hooks/mutations/useChangeImageMutation'
import { useChangeNickNameMutation } from '@hooks/mutations/useChangeNickNameMutation'
import InputMessage from '@components/InputMessage'

const UserProfile = () => {
  const [isNameEditorOpen, setIsNameEditorOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [nickName, setNickName] = useState('')
  const [error, setError] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [user, setUser] = useRecoilState<User>(currentUser)
  const [isReset, setIsReset] = useState(true)

  const { mutate: patchImage } = useChangeImageMutation()
  const { mutate: patchNickName } = useChangeNickNameMutation()

  const nameEditRef = useClickAway(() => setIsNameEditorOpen(false))

  const handleProfileModalOpen = () => {
    setIsProfileModalOpen(true)
    setIsReset(false)
  }

  const handleProfileModalClose = () => {
    setIsProfileModalOpen(false)
    setIsReset(true)
  }

  const handleProfileChange = useCallback((file: File | null) => {
    setImageFile(file)
  }, [])

  const handleProfileSubmit = useCallback(() => {
    if (imageFile) {
      const reader = new FileReader()
      reader.readAsDataURL(imageFile)
      reader.onload = () => {
        setUser({ ...user, image: String(reader.result) })
      }
      patchImage({ userId: user.id, image: imageFile })
    }
    setIsProfileModalOpen(false)
  }, [imageFile, patchImage, user, setUser])

  const handleNicknameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setError('')
      const value = e.target.value.replace(/\s/, '').slice(0, 7)
      if (!REGEX_NICKNAME.test(value)) {
        setError(MESSAGE_NICKNAME)
      }
      setNickName(value)
      e.target.value = value
    },
    []
  )

  const handleNicknameSubmit = useCallback(async () => {
    const { data } = await axios.get(
      `/accounts/check?property=${INPUT_NICKNAME}&value=${nickName}`
    )
    const { errorMessage } = data
    if (errorMessage) {
      setError(errorMessage)
      return
    }

    if (!error) {
      patchNickName({ userId: user.id, nickName: nickName })
      setUser({ ...user, nickName: nickName })
      setIsNameEditorOpen(false)
    }
  }, [nickName, error, user, setUser, patchNickName])

  return (
    <UserProfileWrapper>
      <UserImage
        src={user.image}
        alt={user.nickName}
        width={140}
        height={140}
        onClick={handleProfileModalOpen}
      />
      {isNameEditorOpen ? (
        <>
          <NickName ref={nameEditRef}>
            <ChangeNickNameInput
              type="text"
              placeholder={PLACEHOLDER_NICKNAME}
              onChange={handleNicknameChange}
              isValid={error ? false : true}
            />
            <ChangeNickNameButton onClick={handleNicknameSubmit}>
              수정
            </ChangeNickNameButton>
          </NickName>
          <InputMessage errorMessage={error} />
        </>
      ) : (
        <NickName>
          <Text>{user.nickName}</Text>
          <EditNameIcon onClick={() => setIsNameEditorOpen(true)} />
        </NickName>
      )}
      <ProfileModal
        visible={isProfileModalOpen}
        onClose={handleProfileModalClose}
        className="profile"
      >
        <ModalTitle>프로필을 바꾸시겠어요?</ModalTitle>
        <ImageUploader
          shape="circle"
          size={14}
          onChange={handleProfileChange}
          value={user.image}
          isReset={isReset}
        />
        <ModalButton onClick={handleProfileSubmit}>확인</ModalButton>
      </ProfileModal>
    </UserProfileWrapper>
  )
}

const ProfileModal = styled(Modal)`
  border-radius: 1rem;
  margin-top: 2rem;
  padding: 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 10rem;
`

const ModalTitle = styled.div`
  font-size: 2.8rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
`

const ModalButton = styled(Button)`
  font-size: 1.8rem;
  font-weight: 700;
  height: 5.6rem;
  border-radius: 1rem;
  display: flex;
  margin-top: 1rem;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.color.mainBlack};
  color: ${(props) => props.theme.color.mainWhite};
`

const UserProfileWrapper = styled.div`
  margin: 5rem auto 3rem auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  > span {
    margin-left: -1rem;
  }
`

const UserImage = styled(Image)`
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
  height: 4.8rem;
  font-size: 1.6rem;
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
  width: 1.5rem;
  height: 1.5rem;
  margin-top: 0.3rem;
`

export default UserProfile
