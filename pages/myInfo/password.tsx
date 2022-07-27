import styled from '@emotion/styled'
import { useState } from 'react'
import Input from '@components/Input'
import Button from '@components/Button'
import {
  PLACEHOLDER_EDIT_PASSWORD,
  PLACEHOLDER_EDIT_PASSWORD_CONFIRM
} from '@constants/inputConstant'

interface Errors {
  password?: string
  passwordConfirm?: string
}
const regex = /\S{8,10}/

const MyInfoEditPage = () => {
  const [password, setPassword] = useState('')
  const [passwordIsValid, setPasswordIsValid] = useState(true)
  const [confirmIsValid, setConfirmIsValid] = useState(true)
  const [errors, setErrors] = useState<Errors>({})
  const [isModal, setIsModal] = useState(false)

  const onClose = () => {
    setIsModal(false)
  }

  const validate = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('확인')
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password && !passwordIsValid && !confirmIsValid) {
      //TODO신영: API 호출 HANDLER
      setIsModal(true)
    }
  }
  return (
    <UserContainer>
      <UserInfo>
        <Text>비밀번호를 설정해주세요</Text>
        <UserEditForm onSubmit={handleSubmit}>
          <PasswordInput
            type="password"
            name="password"
            isValid={passwordIsValid}
            onChange={validate}
            placeholder={PLACEHOLDER_EDIT_PASSWORD}
          />
          {errors.password && <ErrorText>{errors.password}</ErrorText>}
          <PasswordInput
            type="password"
            name="confirm"
            isValid={confirmIsValid}
            onChange={validate}
            placeholder={PLACEHOLDER_EDIT_PASSWORD_CONFIRM}
          />
          {errors.passwordConfirm && (
            <ErrorText>{errors.passwordConfirm}</ErrorText>
          )}
          <ChangePasswordButton>완료</ChangePasswordButton>
        </UserEditForm>
      </UserInfo>

      {isModal && <>TODO신영: 모달 넣기</>}
    </UserContainer>
  )
}

const UserContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: white;
`

const UserInfo = styled.div`
  text-align: center;
  margin: 5rem auto 0 auto;
  position: relative;
`

const UserEditForm = styled.form`
  margin: 0 0.5rem 0 0.5rem;
  padding: 2.2rem 2.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 2rem 0 0 0;
  padding-bottom: 9rem;
`

const Text = styled.div`
  margin: 1rem 0 0 2.5rem;
  text-align: left;
  font-weight: 600;
  font-size: 2.8rem;
`
const PasswordInput = styled(Input)`
  width: 100%;
  height: 7rem;
  border-radius: 1rem;
  padding-left: 2rem;
  font-size: 1.7rem;
  margin-top: 2rem;
`

const ErrorText = styled.span`
  text-align: left;
  margin-top: 1rem;
  margin-left: 1rem;
  font-size: 1.4rem;
  color: ${(props) => props.theme.color.mainRed};
`
const ChangePasswordButton = styled(Button)`
  width: 100%;
  height: 7rem;
  margin-top: 4rem;
  background-color: black;
  border-radius: 1rem;
  color: white;
  font-size: 1.7rem;
  font-weight: 500;
  cursor: pointer;
`

export default MyInfoEditPage
