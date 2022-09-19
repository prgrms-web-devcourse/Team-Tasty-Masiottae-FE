import styled from '@emotion/styled'
import { useState, useCallback } from 'react'
import { Input, Button, InputMessage } from '@components/common'
import { BsEye } from 'react-icons/bs'
import {
  PLACEHOLDER_EDIT_PASSWORD,
  PLACEHOLDER_EDIT_PASSWORD_CONFIRM,
  INPUT_PASSWORD,
  INPUT_PASSWORD_CONFIRM
} from '@constants/inputConstants'
import { useChangePasswordMutation } from '@hooks/mutations/useChangePasswordMutation'
import { useRecoilState } from 'recoil'
import { currentUser } from '@recoil/currentUser'
import { useRouter } from 'next/router'
import useValidate from '@hooks/common/useUserValidate'

const PasswordEditPage = () => {
  const { values, errors, validate } = useValidate()
  const [isTypePassword, setIsTypePassword] = useState(false)
  const [isTypeConfirmPassword, setIsTypeConfirmPassword] = useState(false)
  const [user] = useRecoilState(currentUser)
  const router = useRouter()

  const { mutate: patchPassword } = useChangePasswordMutation()

  const handleEyeClick = useCallback(() => {
    setIsTypePassword((isTypePassword) => !isTypePassword)
  }, [])

  const handleConfirmEyeClick = useCallback(() => {
    setIsTypeConfirmPassword((isTypeConfirmPassword) => !isTypeConfirmPassword)
  }, [])

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const isError = Object.keys(errors).some(
      (key) => errors[key as keyof typeof errors] !== ''
    )
    if (user.id && values.password && !isError) {
      patchPassword({ userId: user.id, password: values.password })
      router.back()
    }
  }
  return (
    <UserContainer>
      <Title>비밀번호 변경</Title>
      <UserEditForm>
        <InputWrapper>
          <PasswordInput
            type={isTypePassword ? 'text' : 'password'}
            name={INPUT_PASSWORD}
            isValid={errors[INPUT_PASSWORD] === ''}
            onChange={validate}
            placeholder={PLACEHOLDER_EDIT_PASSWORD}
          />
          <ShowPasswordIcon onClick={handleEyeClick} />
          <InputMessage errorMessage={errors[INPUT_PASSWORD]} />
        </InputWrapper>
        <InputWrapper>
          <PasswordInput
            type={isTypeConfirmPassword ? 'text' : 'password'}
            name={INPUT_PASSWORD_CONFIRM}
            isValid={errors[INPUT_PASSWORD_CONFIRM] === ''}
            onChange={validate}
            placeholder={PLACEHOLDER_EDIT_PASSWORD_CONFIRM}
          />
          <ShowPasswordIcon onClick={handleConfirmEyeClick} />
          <InputMessage errorMessage={errors[INPUT_PASSWORD_CONFIRM]} />
        </InputWrapper>
        <ChangePasswordButton onClick={handleSubmit}>완료</ChangePasswordButton>
      </UserEditForm>
    </UserContainer>
  )
}

const Title = styled.div`
  margin: 3rem 0 4rem 0.5rem;
  text-align: left;
  font-weight: 700;
  font-size: 2.8rem;
`

const UserContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: white;
`

const UserEditForm = styled.form`
  padding-bottom: 9rem;
`

const InputWrapper = styled.div`
  width: 100%;
  position: relative;
  margin-top: 1rem;
`

const PasswordInput = styled(Input)`
  width: 100%;
  height: 5.6rem;
  border-radius: 1rem;
  padding-left: 2rem;
  font-size: 1.8rem;
`

const ShowPasswordIcon = styled(BsEye)`
  width: 2rem;
  height: 2rem;
  position: absolute;
  right: 2.8rem;
  top: 1.7rem;
  cursor: pointer;
`

const ChangePasswordButton = styled(Button)`
  width: 100%;
  height: 5.6rem;
  margin-top: 3rem;
  background-color: ${(props) => props.theme.color.mainBlack};
  border-radius: 1rem;
  color: ${(props) => props.theme.color.mainWhite};
  font-size: 1.8rem;
  font-weight: 700;
  cursor: pointer;
`

export default PasswordEditPage
